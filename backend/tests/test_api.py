import json
from datetime import UTC, datetime

import pytest
from fastapi.testclient import TestClient
from pydantic_ai import models
from pydantic_ai.models.test import TestModel

from cryptopatro.copilot import answer, copilot
from cryptopatro.main import create_app
from cryptopatro.market import sample_market
from cryptopatro.portfolio import build_portfolio
from cryptopatro.settings import Settings
from cryptopatro.storage import DEMO_HOLDINGS

models.ALLOW_MODEL_REQUESTS = False


@pytest.fixture
def client(tmp_path):
    app = create_app(Settings(database_path=str(tmp_path / "portfolio.sqlite3"), market_enabled=False))
    with TestClient(app) as client:
        yield client


def session(client, seed=False, referral=None):
    body = {"seed_demo": seed}
    if referral:
        body["referral"] = referral
    result = client.post("/api/session", json=body)
    assert result.status_code == 201, result.text
    return {"X-Portfolio-Token": result.json()["token"]}


def holding(client, headers, **overrides):
    response = client.post(
        "/api/holdings",
        headers=headers,
        json={
            "asset_id": "bitcoin",
            "quantity": 0.5,
            "avg_cost": 50000,
            **overrides,
        },
    )
    assert response.status_code == 201, response.text
    return response.json()


def test_demo_read_does_not_persist_portfolios(client):
    assert client.get("/api/health").json()["status"] == "ok"
    first = client.get("/api/portfolio").json()
    second = client.get("/api/portfolio").json()
    assert first["is_demo"] and first["holdings"] == second["holdings"]
    assert first["market"]["source"] == "sample"
    with client.app.state.store.connect() as db:
        assert db.execute("SELECT count(*) FROM portfolios").fetchone()[0] == 0


def test_private_portfolios_are_isolated_and_mutations_require_auth(client):
    a, b = session(client), session(client)
    assert a != b
    created = holding(client, a)
    assert client.get("/api/portfolio", headers=b).json()["holdings"] == []
    assert client.patch(f"/api/holdings/{created['id']}", headers=b, json={"quantity": 10}).status_code == 404
    assert client.delete(f"/api/holdings/{created['id']}", headers=b).status_code == 404
    assert client.get("/api/portfolio", headers={"X-Portfolio-Token": "invalid"}).status_code == 401
    assert (
        client.post("/api/holdings", json={"asset_id": "bitcoin", "quantity": 1, "avg_cost": 1}).status_code
        == 401
    )
    assert client.get("/api/alerts").status_code == 401
    assert client.get("/api/portfolio", headers=a).headers["cache-control"] == "no-store"
    with client.app.state.store.connect() as db:
        tokens = [r[0] for r in db.execute("SELECT token_hash FROM portfolios")]
        assert a["X-Portfolio-Token"] not in tokens
        assert all(len(t) == 64 for t in tokens)


def test_holding_crud_math_and_validation(client):
    auth = session(client)
    created = holding(client, auth)
    assert created["value"] == 33710
    assert created["cost"] == 25000
    assert created["profit_loss"] == 8710
    assert created["profit_loss_pct"] == 34.84
    assert created["allocation_pct"] == 100
    portfolio = client.get("/api/portfolio", headers=auth).json()
    assert portfolio["total_value"] == 33710
    assert portfolio["change_24h"] == round(33710 - 33710 / 1.0284, 2)
    assert (
        client.post(
            "/api/holdings", headers=auth, json={"asset_id": "bitcoin", "quantity": 1, "avg_cost": 1}
        ).status_code
        == 409
    )
    updated = client.patch(
        f"/api/holdings/{created['id']}", headers=auth, json={"quantity": 1, "avg_cost": 0}
    )
    assert updated.status_code == 200
    assert updated.json()["profit_loss_pct"] is None
    for payload in ({"quantity": 0}, {"quantity": -1}, {}, {"quantity": None}, {"avg_cost": -1}):
        assert client.patch(f"/api/holdings/{created['id']}", headers=auth, json=payload).status_code == 422
    assert (
        client.post(
            "/api/holdings", headers=auth, json={"asset_id": "fake", "quantity": 1, "avg_cost": 1}
        ).status_code
        == 422
    )
    assert client.delete(f"/api/holdings/{created['id']}", headers=auth).status_code == 204
    assert client.get("/api/portfolio", headers=auth).json()["total_value"] == 0


def test_alerts_are_private_and_sample_prices_never_trigger(client):
    a, b = session(client), session(client)
    response = client.post(
        "/api/alerts",
        headers=a,
        json={
            "asset_id": "bitcoin",
            "direction": "above",
            "target_price": 1,
        },
    )
    assert response.status_code == 201
    alert = response.json()
    assert alert["status"] == "watching"
    assert client.get("/api/alerts", headers=b).json()["alerts"] == []
    assert client.delete(f"/api/alerts/{alert['id']}", headers=b).status_code == 404
    assert client.get("/api/alerts", headers=a).json()["alerts"][0]["status"] == "watching"
    market = sample_market().model_copy(update={"source": "coingecko", "as_of": datetime.now(UTC)})

    async def live():
        return market

    client.app.state.market.get = live
    triggered = client.get("/api/alerts", headers=a).json()["alerts"][0]
    assert triggered["status"] == "triggered"
    assert triggered["triggered_at"]
    assert client.delete(f"/api/alerts/{alert['id']}", headers=a).status_code == 204


def test_public_shares_are_privacy_safe_immutable_and_revocable(client):
    a, b = session(client, seed=True), session(client)
    share = client.post("/api/shares", headers=a, json={"title": "My mix"}).json()
    assert not share["is_demo"]
    assert share["profit_loss_pct"] is None
    assert share["maker_url"] == "https://github.com/dorukgezici"
    allowed = {
        "is_demo",
        "slug",
        "title",
        "created_at",
        "allocation",
        "profit_loss_pct",
        "asset_count",
        "data_source",
        "as_of",
        "maker",
        "maker_url",
    }
    assert set(share) == allowed
    text = json.dumps(share)
    for field in ("quantity", "avg_cost", "total_value", "portfolio_id", "token"):
        assert field not in text
    positions = client.get("/api/portfolio", headers=a).json()["holdings"]
    client.patch(f"/api/holdings/{positions[0]['id']}", headers=a, json={"quantity": 999})
    assert client.get(f"/api/shares/{share['slug']}").json() == share
    assert client.delete(f"/api/shares/{share['slug']}", headers=b).status_code == 404
    assert client.delete(f"/api/shares/{share['slug']}", headers=a).status_code == 204
    assert client.get(f"/api/shares/{share['slug']}").status_code == 404


def test_demo_sharing_and_referral_attribution(client):
    result = client.post("/api/shares", json={"include_performance": True})
    assert result.status_code == 201
    share = result.json()
    assert share["is_demo"] and share["profit_loss_pct"] is not None
    session(client, referral=share["slug"])
    assert (
        client.post("/api/events", json={"name": "share_view", "referral": share["slug"]}).status_code == 204
    )
    assert client.post("/api/events", json={"name": "arbitrary"}).status_code == 422
    with client.app.state.store.connect() as db:
        assert db.execute("SELECT referral FROM portfolios").fetchone()[0] == share["slug"]
        assert db.execute("SELECT count(*) FROM events").fetchone()[0] == 3


def test_local_copilot_is_labeled_and_scoped(client):
    demo = client.post("/api/chat", json={"message": "How concentrated is my portfolio?"}).json()
    assert demo["mode"] == "local"
    assert "sample" in demo["message"]
    assert "Local portfolio summary" in demo["disclaimer"]
    private = client.post("/api/chat", headers=session(client), json={"message": "Overview"}).json()
    assert "empty" in private["message"]
    assert private["highlights"] == []
    forbidden = client.post("/api/chat", json={"message": "What should I buy?"}).json()
    assert "cannot predict" in forbidden["message"]


@pytest.mark.asyncio
async def test_pydantic_ai_structured_plan_uses_verified_numbers():
    portfolio = build_portfolio(DEMO_HOLDINGS, sample_market(), True)
    model = TestModel(custom_output_args={"focus": "allocation"})
    with copilot.override(model=model):
        result = await answer("Explain my allocation", portfolio, "test")
    assert result.mode == "ai"
    assert result.highlights[0].value == f"BTC {portfolio.holdings[0].allocation_pct:.1f}%"
    assert "AI-assisted question routing" in result.disclaimer
    assert model.last_model_request_parameters is not None


@pytest.mark.asyncio
async def test_provider_failure_falls_back_without_exposing_error():
    portfolio = build_portfolio(DEMO_HOLDINGS, sample_market(), True)
    result = await answer("Explain my allocation", portfolio, "not-a-real-provider:bad")
    assert result.mode == "local"
    assert "not-a-real-provider" not in result.model_dump_json()


def test_persistence_survives_app_restart(tmp_path):
    settings = Settings(database_path=str(tmp_path / "persist.sqlite3"), market_enabled=False)
    with TestClient(create_app(settings)) as client:
        auth = session(client)
        created = holding(client, auth)
    with TestClient(create_app(settings)) as client:
        result = client.get("/api/portfolio", headers=auth).json()
        assert result["holdings"][0]["id"] == created["id"]


def test_large_body_and_chat_rate_limit(client):
    assert client.post("/api/chat", content=b"x" * 20000).status_code == 413
    auth = session(client)
    for _ in range(12):
        assert client.post("/api/chat", headers=auth, json={"message": "Overview"}).status_code == 200
    result = client.post("/api/chat", headers=auth, json={"message": "Overview"})
    assert result.status_code == 429
    assert result.headers["retry-after"] == "60"


def test_share_management_survives_restart_and_is_owner_scoped(tmp_path):
    settings = Settings(database_path=str(tmp_path / "shares.sqlite3"), market_enabled=False)
    with TestClient(create_app(settings)) as client:
        a, b = session(client, seed=True), session(client, seed=True)
        first = client.post("/api/shares", headers=a, json={"title": "First"}).json()
        second = client.post("/api/shares", headers=a, json={"title": "Second"}).json()
        other = client.post("/api/shares", headers=b, json={"title": "Other"}).json()
        demo = client.post("/api/shares", json={}).json()
    with TestClient(create_app(settings)) as client:
        assert client.get("/api/shares").status_code == 401
        assert client.get("/api/shares", headers=a).json() == {"shares": [second, first]}
        assert client.get("/api/shares", headers=b).json() == {"shares": [other]}
        assert demo not in client.get("/api/shares", headers=a).json()["shares"]
        assert client.delete(f"/api/shares/{first['slug']}", headers=b).status_code == 404
        assert client.delete(f"/api/shares/{first['slug']}", headers=a).status_code == 204
        assert client.get("/api/shares", headers=a).json() == {"shares": [second]}
        assert client.get(f"/api/shares/{first['slug']}").status_code == 404


def test_share_list_is_bounded_to_newest_hundred(client):
    from cryptopatro.schemas import Share

    auth = session(client, seed=True)
    original = Share.model_validate(client.post("/api/shares", headers=auth, json={}).json())
    owner = client.app.state.store.authenticate(auth["X-Portfolio-Token"])
    for index in range(105):
        share = original.model_copy(update={"slug": f"test-{index:03d}"})
        client.app.state.store.save_share(owner, share)
    listed = client.get("/api/shares", headers=auth).json()["shares"]
    assert len(listed) == 100
    assert listed[0]["slug"] == "test-104"
    assert listed[-1]["slug"] == "test-005"


def test_unknown_cost_never_looks_like_pure_profit(client):
    auth = session(client)
    unknown = holding(client, auth, avg_cost=0)
    assert unknown["profit_loss"] == 0
    assert unknown["profit_loss_pct"] is None
    known = holding(client, auth, asset_id="ethereum", quantity=1, avg_cost=2000)
    result = client.get("/api/portfolio", headers=auth).json()
    assert result["profit_loss"] == known["profit_loss"]
    assert result["profit_loss_pct"] is None
    share = client.post("/api/shares", headers=auth, json={"include_performance": True}).json()
    assert share["profit_loss_pct"] is None
    response = client.post("/api/chat", headers=auth, json={"message": "Explain my returns"}).json()
    assert "cannot be calculated" in response["message"]


def test_tiny_and_boolean_monetary_inputs_are_rejected(client):
    auth = session(client)
    for field in ("quantity", "avg_cost"):
        for value in (1e-300, True):
            response = client.post(
                "/api/holdings",
                headers=auth,
                json={
                    "asset_id": "bitcoin",
                    "quantity": 1,
                    "avg_cost": 1,
                    field: value,
                },
            )
            assert response.status_code == 422


def test_alert_limit_is_atomic_under_concurrent_creates(client):
    from concurrent.futures import ThreadPoolExecutor

    from cryptopatro.schemas import AlertInput

    auth = session(client)
    store = client.app.state.store
    owner = store.authenticate(auth["X-Portfolio-Token"])
    data = AlertInput(asset_id="bitcoin", direction="above", target_price=1)
    for _ in range(49):
        store.create_alert(owner, data)

    def create(_):
        try:
            store.create_alert(owner, data)
            return True
        except ValueError:
            return False

    with ThreadPoolExecutor(max_workers=8) as executor:
        outcomes = list(executor.map(create, range(8)))
    assert sum(outcomes) == 1
    assert len(store.alerts(owner, None)) == 50


def test_nonfinite_json_is_a_validation_error_not_server_error(client):
    auth = session(client)
    for value in ("NaN", "Infinity", "-Infinity", "1e999"):
        response = client.post(
            "/api/holdings",
            headers={**auth, "Content-Type": "application/json"},
            content='{"asset_id":"bitcoin","quantity":' + value + ',"avg_cost":1}',
        )
        assert response.status_code == 422
        assert response.json()["detail"][0]["loc"] == ["body", "quantity"]


def test_maker_event_is_bounded_and_activation_cannot_be_spoofed(client):
    assert client.post("/api/events", json={"name": "maker_clicked"}).status_code == 204
    assert client.post("/api/events", json={"name": "maker_clicked", "balance": 100}).status_code == 422
    assert client.post("/api/events", json={"name": "portfolio_activated"}).status_code == 422
    assert client.post("/api/events", json={"name": "referral_activated"}).status_code == 422
