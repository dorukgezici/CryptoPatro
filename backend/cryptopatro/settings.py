from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="CRYPTOPATRO_", extra="ignore")

    database_path: str = "data/cryptopatro.sqlite3"
    cors_origins: list[str] = ["http://localhost:4321", "http://127.0.0.1:4321"]
    trust_proxy_headers: bool = False
    ai_model: str | None = None
    market_enabled: bool = True
    market_cache_seconds: int = 90
    market_stale_seconds: int = 900
    max_request_bytes: int = 16384
