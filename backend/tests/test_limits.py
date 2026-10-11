import asyncio
import sqlite3
from concurrent.futures import ThreadPoolExecutor

import httpx
import pytest
from fastapi import HTTPException, Request
from fastapi.testclient import TestClient
from pydantic_ai.models.test import TestModel

from cryptopatro.copilot import copilot, render_answer
from cryptopatro.limits import RateLimiter, Rule, public_client_ip
from cryptopatro.main import create_app
from cryptopatro.settings import Settings
from cryptopatro.storage import Store


def configured_app(tmp_path, **overrides):
    return create_app(
        Settings(database_path=str(tmp_path / "limits.sqlite3"), market_enabled=False, **overrides)
    )


def new_owner(client):
    response = client.post("/api/session", json={"seed_demo": True})
    assert response.status_code == 201, response.text
    return {"X-Portfolio-Token": response.json()["token"]}


@pytest.mark.parametrize("peer", ["100.87.94.37", "10.42.0.1", "8.8.8.8"])
def test_shared_proxy_keeps_portfolio_limits_separate(tmp_path, peer):
    app = configured_app(tmp_path, rate_limit_mode="shared_proxy", trust_proxy_headers=True)
    with TestClient(app, headers={"X-Forwarded-For": peer}) as client:
        owners = [new_owner(client) for _ in range(31)]
        for owner in owners[:6]:
            for _ in range(12):
                assert (
                    client.post("/api/chat", headers=owner, json={"message": "Overview"}).status_code == 200
                )
            assert client.post("/api/chat", headers=owner, json={"message": "Overview"}).status_code == 429
        for _ in range(15):
            assert client.post("/api/shares", headers=owners[0], json={}).status_code == 201
        assert client.post("/api/shares", headers=owners[0], json={}).status_code == 429
        assert client.post("/api/shares", headers=owners[1], json={}).status_code == 201


@pytest.mark.parametrize(
    ("trust", "peer", "forwarded", "mode", "expected"),
    [
        (False, "8.8.8.8", "1.1.1.1", "client_ip", "8.8.8.8"),
        (True, "10.0.0.1", "8.8.8.8", "client_ip", "8.8.8.8"),
        (True, "10.0.0.1", "::ffff:8.8.8.8", "client_ip", "8.8.8.8"),
        (True, "8.8.8.8", "", "client_ip", None),
        (True, "10.0.0.1", "8.8.8.8, 1.1.1.1", "client_ip", None),
        (True, "10.0.0.1", "100.87.94.37", "client_ip", None),
        (True, "10.0.0.1", "127.0.0.1", "client_ip", None),
        (True, "10.0.0.1", "224.0.0.1", "client_ip", None),
        (True, "10.0.0.1", "ff0e::1", "client_ip", None),
        (True, "10.0.0.1", "2001:4860::1%interface", "client_ip", None),
        (True, "10.0.0.1", "8.8.8.8", "shared_proxy", None),
    ],
)
def test_only_verified_public_peer_can_be_an_ip_key(trust, peer, forwarded, mode, expected):
    request = Request(
        {
            "type": "http",
            "client": (peer, 40000),
            "headers": [(b"x-forwarded-for", forwarded.encode())],
        }
    )
    assert public_client_ip(request, Settings(trust_proxy_headers=trust, rate_limit_mode=mode)) == expected


def test_public_ip_quota_survives_token_and_untrusted_header_rotation(tmp_path):
    app = configured_app(tmp_path)
    with TestClient(app, client=("8.8.8.8", 40000)) as client:
        for index in range(5):
            owner = {**new_owner(client), "X-Forwarded-For": f"1.1.1.{index}"}
            for _ in range(12):
                assert (
                    client.post("/api/chat", headers=owner, json={"message": "Overview"}).status_code == 200
                )
        assert (
            client.post("/api/chat", headers=new_owner(client), json={"message": "Overview"}).status_code
            == 429
        )
    with TestClient(app, client=("1.1.1.1", 40000)) as client:
        assert client.post("/api/chat", json={"message": "Overview"}).status_code == 200


@pytest.mark.parametrize(
    ("endpoint", "payload", "setting", "table", "success"),
    [
        ("/api/session", {}, "service_sessions_per_minute", "portfolios", 201),
        ("/api/shares", {}, "service_shares_per_hour", "shares", 201),
        ("/api/events", {"name": "maker_clicked"}, "service_events_per_minute", "events", 204),
    ],
)
def test_anonymous_writes_keep_explicit_service_capacity(
    tmp_path, endpoint, payload, setting, table, success
):
    app = configured_app(tmp_path, rate_limit_mode="shared_proxy", **{setting: 2})
    with TestClient(app) as client:
        for _ in range(2):
            assert client.post(endpoint, json=payload).status_code == success
        response = client.post(endpoint, json=payload, headers={"X-Forwarded-For": "8.8.8.8"})
        assert response.status_code == 429
        assert "Service capacity" in response.json()["detail"]
        assert int(response.headers["retry-after"]) > 0
        with app.state.store.connect() as db:
            assert db.execute(f"SELECT count(*) FROM {table}").fetchone()[0] == 2


def test_invalid_tokens_cannot_consume_valid_chat_capacity(tmp_path):
    app = configured_app(tmp_path, rate_limit_mode="shared_proxy", service_chat_per_minute=1)
    with TestClient(app) as client:
        for index in range(20):
            response = client.post(
                "/api/chat",
                headers={"X-Portfolio-Token": "invalid" + str(index)},
                json={"message": "Overview"},
            )
            assert response.status_code == 401
        assert (
            client.post("/api/chat", headers=new_owner(client), json={"message": "Overview"}).status_code
            == 200
        )
        assert client.post("/api/chat", json={"message": "Overview"}).status_code == 429


def test_multiwindow_admission_does_not_charge_rejected_owner():
    limiter = RateLimiter()
    capacity = Rule("service", 2)
    limiter.check([Rule("alice", 1), capacity])
    for _ in range(20):
        with pytest.raises(HTTPException):
            limiter.check([capacity, Rule("alice", 1)])
    limiter.check([Rule("bob", 1), capacity])
    with pytest.raises(HTTPException):
        limiter.check([Rule("carol", 1), capacity])


def test_capacity_boundary_is_atomic():
    limiter = RateLimiter()

    def attempt(_):
        try:
            limiter.check([Rule("service", 3)])
            return True
        except HTTPException:
            return False

    with ThreadPoolExecutor(max_workers=16) as executor:
        assert sum(executor.map(attempt, range(32))) == 3


def test_full_key_table_preserves_existing_identities():
    limiter = RateLimiter()
    for index in range(10000):
        limiter.check([Rule(f"owner:{index}", 2)])
    limiter.check([Rule("owner:0", 2)])
    with pytest.raises(HTTPException) as error:
        limiter.check([Rule("new-owner", 2)])
    assert error.value.status_code == 429
    assert error.value.headers["Retry-After"] == "60"
    limiter.check([Rule("owner:1", 2)])


def test_paid_budget_is_atomic_and_persists_across_restart(tmp_path):
    path = str(tmp_path / "budget.sqlite3")
    store = Store(path)
    store.initialize()
    with ThreadPoolExecutor(max_workers=16) as executor:
        assert sum(executor.map(lambda _: store.reserve_ai_run(3, 10), range(32))) == 3
    reopened = Store(path)
    reopened.initialize()
    assert not reopened.reserve_ai_run(3, 10)
    with reopened.connect() as db:
        assert db.execute("SELECT count(*) FROM ai_runs").fetchone()[0] == 3
        assert {row[1] for row in db.execute("PRAGMA table_info(ai_runs)")} == {"id", "created_at"}


def test_paid_budget_enforces_hour_and_day_windows_and_prunes(tmp_path, monkeypatch):
    current = [100000.0]
    monkeypatch.setattr("cryptopatro.storage.time.time", lambda: current[0])
    store = Store(str(tmp_path / "budget.sqlite3"))
    store.initialize()
    assert store.reserve_ai_run(2, 3)
    assert store.reserve_ai_run(2, 3)
    assert not store.reserve_ai_run(2, 3)
    current[0] += 3601
    assert store.reserve_ai_run(2, 3)
    assert not store.reserve_ai_run(2, 3)
    current[0] += 86400
    assert store.reserve_ai_run(2, 3)
    with store.connect() as db:
        assert db.execute("SELECT count(*) FROM ai_runs").fetchone()[0] == 1


def test_new_tokens_cannot_reset_paid_budget_and_fallback_is_useful(tmp_path):
    settings = Settings(
        database_path=str(tmp_path / "budget.sqlite3"),
        market_enabled=False,
        rate_limit_mode="shared_proxy",
        ai_model="test",
        ai_runs_per_hour=1,
    )
    with copilot.override(model=TestModel(custom_output_args={"focus": "allocation"})):
        with TestClient(create_app(settings)) as client:
            first = client.post("/api/chat", headers=new_owner(client), json={"message": "My mix"})
            assert first.json()["mode"] == "ai"
            next_owner = new_owner(client)
        with TestClient(create_app(settings)) as client:
            for headers in (next_owner, new_owner(client), {}):
                result = client.post(
                    "/api/chat", headers=headers, json={"message": "How concentrated is my mix?"}
                )
                assert result.status_code == 200
                assert result.json()["mode"] == "local"
                assert "AI capacity" in result.json()["disclaimer"]
                assert result.json()["highlights"]


def test_unavailable_paid_ledger_fails_closed_with_local_answer(tmp_path, monkeypatch):
    app = configured_app(tmp_path, rate_limit_mode="shared_proxy", ai_model="test")

    def unavailable(*_):
        raise sqlite3.OperationalError("private database diagnostic")

    monkeypatch.setattr(app.state.store, "reserve_ai_run", unavailable)
    model = TestModel(custom_output_args={"focus": "allocation"})
    with copilot.override(model=model), TestClient(app) as client:
        result = client.post("/api/chat", json={"message": "My mix"})
        assert result.status_code == 200 and result.json()["mode"] == "local"
        assert "AI capacity" in result.json()["disclaimer"]
        assert "private database diagnostic" not in result.text
        assert model.last_model_request_parameters is None


@pytest.mark.asyncio
async def test_ai_concurrency_overflow_falls_back_and_cancellation_releases_slot(tmp_path, monkeypatch):
    entered = asyncio.Event()
    provider_calls = []

    async def controlled_answer(message, portfolio, model, *, capacity_fallback=False):
        if model:
            provider_calls.append(message)
            if len(provider_calls) == 1:
                entered.set()
                await asyncio.Event().wait()
        result = render_answer(portfolio, "overview", "ai" if model else "local")
        if capacity_fallback:
            result.disclaimer = "AI capacity"
        return result

    monkeypatch.setattr("cryptopatro.main.answer", controlled_answer)
    app = configured_app(tmp_path, rate_limit_mode="shared_proxy", ai_model="test", ai_max_concurrent=1)
    async with app.router.lifespan_context(app):
        async with httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app), base_url="http://test"
        ) as client:
            first = asyncio.create_task(client.post("/api/chat", json={"message": "First"}))
            await asyncio.wait_for(entered.wait(), 2)
            overflow = await client.post("/api/chat", json={"message": "Second"})
            assert overflow.status_code == 200 and overflow.json()["mode"] == "local"
            assert len(provider_calls) == 1
            first.cancel()
            with pytest.raises(asyncio.CancelledError):
                await first
            after = await client.post("/api/chat", json={"message": "Third"})
            assert after.status_code == 200 and after.json()["mode"] == "ai"
            assert len(provider_calls) == 2
            with app.state.store.connect() as db:
                assert db.execute("SELECT count(*) FROM ai_runs").fetchone()[0] == 2
