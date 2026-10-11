from datetime import UTC, datetime, timedelta

import httpx
import pytest

from cryptopatro.market import CATALOG, MarketService, sample_market
from cryptopatro.settings import Settings


class FakeClient:
    payload = None
    fail = False
    calls = 0

    def __init__(self, **kwargs):
        pass

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        return None

    async def get(self, url, **kwargs):
        type(self).calls += 1
        if type(self).fail:
            raise httpx.ConnectError("unavailable")
        return httpx.Response(200, request=httpx.Request("GET", url), json=type(self).payload)


def fixture_payload(timestamp=None):
    timestamp = timestamp or datetime.now(UTC)
    return [
        {
            "id": asset_id,
            "last_updated": timestamp.isoformat(),
            "current_price": price,
            "price_change_percentage_24h": change,
            "sparkline_in_7d": {"price": [price, price]},
        }
        for asset_id, (_, _, _, price, change) in CATALOG.items()
    ]


@pytest.fixture
def provider(monkeypatch):
    FakeClient.payload = fixture_payload()
    FakeClient.fail = False
    FakeClient.calls = 0
    monkeypatch.setattr("cryptopatro.market.httpx.AsyncClient", FakeClient)
    return FakeClient


@pytest.mark.asyncio
async def test_live_cache_and_provider_failure_preserve_source_timestamp(provider):
    service = MarketService(Settings(market_cache_seconds=0))
    live = await service.get()
    assert live.source == "coingecko"
    assert len(live.assets) == 6
    provider.fail = True
    cached = await service.get()
    assert cached.source == "cached"
    assert cached.as_of == live.as_of
    assert cached.assets == live.assets
    service._cache.as_of = datetime.now(UTC) - timedelta(hours=1)
    sample = await service.get()
    assert sample.source == "sample"
    assert "not current" in sample.notice
    assert sample.as_of == sample_market().as_of


@pytest.mark.asyncio
async def test_cache_avoids_repeated_provider_calls(provider):
    service = MarketService(Settings(market_cache_seconds=60))
    await service.get()
    await service.get()
    assert provider.calls == 1


@pytest.mark.asyncio
async def test_missing_or_stale_provider_rows_fall_back_explicitly(provider):
    service = MarketService(Settings(market_cache_seconds=0))
    provider.payload = fixture_payload()[:-1]
    assert (await service.get()).source == "sample"
    provider.payload = fixture_payload(datetime.now(UTC) - timedelta(hours=1))
    assert (await service.get()).source == "sample"


@pytest.mark.asyncio
async def test_concurrent_market_reads_share_one_provider_request(provider):
    import asyncio

    service = MarketService(Settings(market_cache_seconds=60))
    results = await asyncio.gather(*(service.get() for _ in range(20)))
    assert provider.calls == 1
    assert all(result.source == "coingecko" for result in results)


@pytest.mark.asyncio
@pytest.mark.parametrize(
    "field,value",
    [
        ("last_updated", None),
        ("last_updated", 5),
        ("sparkline_in_7d", "invalid"),
        ("sparkline_in_7d", {"price": "invalid"}),
    ],
)
async def test_malformed_provider_data_uses_fallback(provider, field, value):
    provider.payload[0][field] = value
    service = MarketService(Settings(market_cache_seconds=0))
    assert (await service.get()).source == "sample"


@pytest.mark.asyncio
async def test_missing_optional_sparkline_keeps_valid_quotes(provider):
    provider.payload[0]["sparkline_in_7d"] = None
    service = MarketService(Settings(market_cache_seconds=0))
    result = await service.get()
    assert result.source == "coingecko"
    assert result.assets[0].sparkline == []
