import ipaddress
import secrets
import sqlite3
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from datetime import UTC, datetime
from threading import Lock
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.concurrency import run_in_threadpool

from .copilot import answer
from .market import CATALOG, MarketService
from .portfolio import build_portfolio
from .schemas import (
    Alert,
    AlertInput,
    AlertList,
    ChatInput,
    ChatResponse,
    EventInput,
    Holding,
    HoldingInput,
    HoldingPatch,
    Market,
    Portfolio,
    Session,
    SessionInput,
    Share,
    ShareInput,
    ShareList,
)
from .settings import Settings
from .storage import DEMO_HOLDINGS, Store, token_hash


class RateLimiter:
    """Bounded, per-process protection for the single-worker self-host deployment."""

    def __init__(self):
        self.windows: dict[str, deque] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str, limit: int, seconds: int = 60):
        with self._lock:
            self._check(key, limit, seconds)

    def _check(self, key: str, limit: int, seconds: int):
        current = time.monotonic()
        if len(self.windows) > 10000:
            # Drop inactive keys, not active windows, to prevent resetting an active quota.
            self.windows = defaultdict(
                deque, {k: v for k, v in self.windows.items() if v and current - v[-1] < 3600}
            )
            if len(self.windows) > 10000 and key not in self.windows:
                raise HTTPException(429, "Service is busy. Please try again shortly.")
        window = self.windows[key]
        while window and current - window[0] >= seconds:
            window.popleft()
        if len(window) >= limit:
            raise HTTPException(
                429, "Too many requests. Please try again shortly.", headers={"Retry-After": str(seconds)}
            )
        window.append(current)


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings()
    store = Store(settings.database_path)
    market_service = MarketService(settings)
    limiter = RateLimiter()

    @asynccontextmanager
    async def lifespan(_: FastAPI):
        store.initialize()
        yield

    app = FastAPI(title="CryptoPatro API", version="2.0.0", lifespan=lifespan)
    app.state.store = store
    app.state.market = market_service
    app.state.settings = settings
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_methods=["GET", "POST", "PATCH", "DELETE"],
        allow_headers=["Content-Type", "X-Portfolio-Token"],
    )

    @app.exception_handler(RequestValidationError)
    async def invalid_input(_: Request, exc: RequestValidationError):
        # Input may include nonfinite numbers or exception objects that are not JSON safe.
        errors = [{"loc": error["loc"], "msg": error["msg"], "type": error["type"]} for error in exc.errors()]
        return JSONResponse(status_code=422, content={"detail": errors})

    @app.middleware("http")
    async def safeguards(request: Request, call_next):
        body = bytearray()
        async for chunk in request.stream():
            body.extend(chunk)
            if len(body) > settings.max_request_bytes:
                return JSONResponse(status_code=413, content={"detail": "Request body is too large."})
        request._body = bytes(body)
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Cache-Control"] = "no-store"
        return response

    def optional_owner(request: Request) -> str | None:
        token = request.headers.get("X-Portfolio-Token")
        if token is None:
            return None
        owner = store.authenticate(token)
        if not owner:
            raise HTTPException(401, "This portfolio key is invalid. Start a new private portfolio.")
        return owner

    def required_owner(owner: Annotated[str | None, Depends(optional_owner)]) -> str:
        if owner is None:
            raise HTTPException(401, "Start a private portfolio before making changes.")
        return owner

    def rate(request: Request, action: str, limit: int, seconds: int = 60):
        # Enable only behind our isolated frontend, which overwrites this header.
        peer = request.client.host if request.client else "unknown"
        if settings.trust_proxy_headers:
            forwarded = request.headers.get("X-Forwarded-For", "")
            try:
                peer = str(ipaddress.ip_address(forwarded))
            except ValueError:
                pass
        identity = (request.headers.get("X-Portfolio-Token") or peer) if action in {"chat", "share"} else peer
        if action == "chat":
            limiter.check(f"chat-ip:{token_hash(peer)}", 60, 3600)
        limiter.check(f"{action}:{token_hash(identity)}", limit, seconds)

    async def portfolio_for(owner: str | None) -> Portfolio:
        return build_portfolio(
            await run_in_threadpool(store.holdings, owner) if owner else DEMO_HOLDINGS,
            await market_service.get(),
            is_demo=owner is None,
        )

    @app.get("/api/health")
    def health():
        return {"status": "ok", "version": "2.0.0", "ai_configured": bool(settings.ai_model)}

    @app.post("/api/session", response_model=Session, status_code=201)
    def session(data: SessionInput, request: Request):
        rate(request, "session", 30, 3600)
        portfolio_id, token = store.create_session(data.seed_demo, data.referral)
        return Session(portfolio_id=portfolio_id, token=token)

    @app.get("/api/market", response_model=Market)
    async def market():
        return await market_service.get()

    @app.get("/api/portfolio", response_model=Portfolio)
    async def portfolio(owner: Annotated[str | None, Depends(optional_owner)]):
        return await portfolio_for(owner)

    @app.post("/api/holdings", response_model=Holding, status_code=201)
    async def add_holding(data: HoldingInput, owner: Annotated[str, Depends(required_owner)]):
        try:
            holding_id = await run_in_threadpool(store.create_holding, owner, data)
        except sqlite3.IntegrityError as exc:
            raise HTTPException(409, "You already track this asset. Edit its existing holding.") from exc
        result = await portfolio_for(owner)
        holding = next((h for h in result.holdings if h.id == holding_id), None)
        if holding is None:
            raise HTTPException(409, "This holding was removed by another request. Refresh your portfolio.")
        return holding

    @app.patch("/api/holdings/{holding_id}", response_model=Holding)
    async def update_holding(
        holding_id: str, data: HoldingPatch, owner: Annotated[str, Depends(required_owner)]
    ):
        if not await run_in_threadpool(store.update_holding, owner, holding_id, data):
            raise HTTPException(404, "Holding not found.")
        result = await portfolio_for(owner)
        holding = next((h for h in result.holdings if h.id == holding_id), None)
        if holding is None:
            raise HTTPException(409, "This holding was removed by another request. Refresh your portfolio.")
        return holding

    @app.delete("/api/holdings/{holding_id}", status_code=204)
    def delete_holding(holding_id: str, owner: Annotated[str, Depends(required_owner)]):
        if not store.delete_holding(owner, holding_id):
            raise HTTPException(404, "Holding not found.")
        return Response(status_code=204)

    def alert_response(row: dict) -> Alert:
        return Alert(
            **row,
            symbol=CATALOG[row["asset_id"]][0],
            status="triggered" if row["triggered_at"] else "watching",
        )

    @app.get("/api/alerts", response_model=AlertList)
    async def alerts(owner: Annotated[str, Depends(required_owner)]):
        quotes = await market_service.get()
        # A cached quote predates the current check. Only a live-source snapshot may trigger an alert.
        prices = {asset.id: asset.price for asset in quotes.assets} if quotes.source == "coingecko" else None
        rows = await run_in_threadpool(store.alerts, owner, prices)
        return AlertList(
            alerts=[alert_response(row) for row in rows],
            market_source=quotes.source,
            evaluated_at=datetime.now(UTC),
        )

    @app.post("/api/alerts", response_model=Alert, status_code=201)
    def add_alert(data: AlertInput, owner: Annotated[str, Depends(required_owner)]):
        try:
            return alert_response(store.create_alert(owner, data))
        except ValueError as exc:
            raise HTTPException(409, str(exc)) from exc

    @app.delete("/api/alerts/{alert_id}", status_code=204)
    def delete_alert(alert_id: str, owner: Annotated[str, Depends(required_owner)]):
        if not store.delete_alert(owner, alert_id):
            raise HTTPException(404, "Alert not found.")
        return Response(status_code=204)

    @app.post("/api/chat", response_model=ChatResponse)
    async def chat(data: ChatInput, request: Request, owner: Annotated[str | None, Depends(optional_owner)]):
        rate(request, "chat", 12)
        return await answer(data.message, await portfolio_for(owner), settings.ai_model)

    @app.post("/api/shares", response_model=Share, status_code=201)
    async def add_share(
        data: ShareInput, request: Request, owner: Annotated[str | None, Depends(optional_owner)]
    ):
        rate(request, "share", 15, 3600)
        p = await portfolio_for(owner)
        if not p.holdings:
            raise HTTPException(409, "Add at least one holding before creating a share card.")
        share = Share(
            is_demo=p.is_demo,
            slug=secrets.token_urlsafe(12),
            title=data.title,
            created_at=datetime.now(UTC),
            allocation=p.allocation,
            profit_loss_pct=p.profit_loss_pct if data.include_performance else None,
            asset_count=len(p.holdings),
            data_source=p.market.source,
            as_of=p.market.as_of,
        )
        await run_in_threadpool(store.save_share, owner, share)
        return share

    @app.get("/api/shares", response_model=ShareList)
    def list_shares(owner: Annotated[str, Depends(required_owner)]):
        return ShareList(shares=store.shares(owner))

    @app.get("/api/shares/{slug}", response_model=Share)
    def get_share(slug: str):
        result = store.share(slug)
        if result is None:
            raise HTTPException(404, "This share card was not found or has been removed.")
        return result

    @app.delete("/api/shares/{slug}", status_code=204)
    def delete_share(slug: str, owner: Annotated[str, Depends(required_owner)]):
        if not store.delete_share(owner, slug):
            raise HTTPException(404, "Share card not found.")
        return Response(status_code=204)

    @app.post("/api/events", status_code=204)
    def record_event(data: EventInput, request: Request):
        rate(request, "event", 60)
        store.event(data.name, data.referral)
        return Response(status_code=204)

    return app


app = create_app()
