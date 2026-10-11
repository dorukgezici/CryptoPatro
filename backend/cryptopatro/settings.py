from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="CRYPTOPATRO_", extra="ignore")

    database_path: str = "data/cryptopatro.sqlite3"
    cors_origins: list[str] = ["http://localhost:4321", "http://127.0.0.1:4321"]
    trust_proxy_headers: bool = False
    rate_limit_mode: Literal["client_ip", "shared_proxy"] = "client_ip"
    service_sessions_per_minute: int = Field(default=120, ge=1, le=10000)
    service_sessions_per_hour: int = Field(default=2000, ge=1, le=100000)
    service_shares_per_minute: int = Field(default=120, ge=1, le=10000)
    service_shares_per_hour: int = Field(default=1000, ge=1, le=100000)
    service_events_per_minute: int = Field(default=600, ge=1, le=10000)
    service_chat_per_minute: int = Field(default=240, ge=1, le=10000)
    ai_runs_per_hour: int = Field(default=120, ge=0, le=10000)
    ai_runs_per_day: int = Field(default=1000, ge=0, le=100000)
    ai_max_concurrent: int = Field(default=4, ge=1, le=32)
    ai_model: str | None = None
    market_enabled: bool = True
    market_cache_seconds: int = 90
    market_stale_seconds: int = 900
    max_request_bytes: int = 16384
