"""Public market quotes with explicit provenance and a clearly marked sample fallback."""

import asyncio
import math
import time
from datetime import UTC, datetime

import httpx
from pydantic import ValidationError

from .schemas import Asset, Market
from .settings import Settings

CATALOG = {
    "bitcoin": ("BTC", "Bitcoin", "#F7931A", 67420.0, 2.84),
    "ethereum": ("ETH", "Ethereum", "#8B93E6", 3521.8, 1.67),
    "solana": ("SOL", "Solana", "#91E2BD", 168.42, 5.24),
    "usd-coin": ("USDC", "USD Coin", "#2775CA", 1.0, 0.01),
    "avalanche-2": ("AVAX", "Avalanche", "#E84142", 35.72, -1.32),
    "chainlink": ("LINK", "Chainlink", "#2A5ADA", 17.84, 3.16),
}


def sample_market() -> Market:
    assets = []
    for index, (asset_id, (symbol, name, color, price, change)) in enumerate(CATALOG.items()):
        sparkline = [
            round(price * (0.91 + i / 800 + math.sin(i * 0.65 + index) * 0.012), 5) for i in range(72)
        ]
        if asset_id == "usd-coin":
            sparkline = [1.0] * 72
        sparkline[-1] = price
        assets.append(
            Asset(
                id=asset_id,
                symbol=symbol,
                name=name,
                color=color,
                price=price,
                change_24h_pct=change,
                sparkline=sparkline,
            )
        )
    return Market(
        assets=assets,
        source="sample",
        as_of=datetime(2026, 1, 1, tzinfo=UTC),
        notice="Illustrative sample prices and charts. These are not current market quotes.",
    )


class MarketService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._cache: Market | None = None
        self._attempted_at = 0.0
        self._failed = False
        self._lock = asyncio.Lock()

    async def get(self) -> Market:
        if not self.settings.market_enabled:
            return sample_market()
        async with self._lock:
            elapsed = time.monotonic() - self._attempted_at
            if self._attempted_at and elapsed < self.settings.market_cache_seconds:
                return self._fallback()
            self._attempted_at = time.monotonic()
            try:
                async with httpx.AsyncClient(timeout=6, follow_redirects=False) as client:
                    response = await client.get(
                        "https://api.coingecko.com/api/v3/coins/markets",
                        params={
                            "vs_currency": "usd",
                            "ids": ",".join(CATALOG),
                            "sparkline": "true",
                        },
                        headers={"Accept": "application/json", "User-Agent": "CryptoPatro/2.0"},
                    )
                    response.raise_for_status()
                rows = {row["id"]: row for row in response.json() if row["id"] in CATALOG}
                assets, updated = [], []
                for asset_id, (symbol, name, color, _, _) in CATALOG.items():
                    row = rows[asset_id]
                    if not isinstance(row.get("last_updated"), str):
                        raise ValueError("Market source omitted timestamp")
                    timestamp = datetime.fromisoformat(row["last_updated"].replace("Z", "+00:00"))
                    if (datetime.now(UTC) - timestamp).total_seconds() > self.settings.market_stale_seconds:
                        raise ValueError("Market source returned stale data")
                    if (timestamp - datetime.now(UTC)).total_seconds() > 300:
                        raise ValueError("Market timestamp is in the future")
                    updated.append(timestamp)
                    history = row.get("sparkline_in_7d") or {}
                    if not isinstance(history, dict):
                        raise ValueError("Market source returned invalid history")
                    sparkline = history.get("price") or []
                    if not isinstance(sparkline, list):
                        raise ValueError("Market source returned invalid prices")
                    sparkline = [
                        float(p)
                        for p in sparkline
                        if isinstance(p, (int, float)) and math.isfinite(p) and p > 0
                    ]
                    assets.append(
                        Asset(
                            id=asset_id,
                            symbol=symbol,
                            name=name,
                            color=color,
                            price=row["current_price"],
                            change_24h_pct=row["price_change_percentage_24h"] or 0,
                            sparkline=sparkline,
                        )
                    )
                self._cache = Market(
                    assets=assets,
                    source="coingecko",
                    as_of=min(updated),
                    notice="CoinGecko USD prices. Cached briefly; market data may be delayed.",
                )
                self._failed = False
                return self._cache.model_copy(deep=True)
            except httpx.HTTPError, ValueError, KeyError, TypeError, ValidationError:
                self._failed = True
                return self._fallback()

    def _fallback(self) -> Market:
        if self._cache and (datetime.now(UTC) - self._cache.as_of).total_seconds() <= (
            self.settings.market_stale_seconds
        ):
            result = self._cache.model_copy(deep=True)
            if self._failed:
                result.source = "cached"
                result.notice = (
                    "CoinGecko is unavailable. Showing the last successful quotes with their timestamp."
                )
            return result
        return sample_market()
