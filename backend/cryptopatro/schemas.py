from datetime import datetime
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

AssetId = Literal["bitcoin", "ethereum", "solana", "usd-coin", "avalanche-2", "chainlink"]
Source = Literal["coingecko", "cached", "sample"]
PositiveAmount = Annotated[float, Field(ge=1e-12, le=1e12, allow_inf_nan=False, strict=True)]
CostAmount = Annotated[float, Field(ge=0, le=1e12, allow_inf_nan=False, strict=True)]


class InputModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class SessionInput(InputModel):
    seed_demo: bool = False
    referral: str | None = Field(default=None, max_length=32, pattern=r"^[A-Za-z0-9_-]+$")


class Session(BaseModel):
    token: str
    portfolio_id: str


class Asset(BaseModel):
    id: AssetId
    symbol: str
    name: str
    price: float = Field(gt=0, le=1e15, allow_inf_nan=False)
    change_24h_pct: float = Field(gt=-100, le=1e6, allow_inf_nan=False)
    color: str
    sparkline: list[float]


class Market(BaseModel):
    assets: list[Asset]
    source: Source
    as_of: datetime
    notice: str


class CostInput(InputModel):
    @field_validator("avg_cost", check_fields=False)
    @classmethod
    def validate_cost(cls, value):
        if value is not None and 0 < value < 1e-12:
            raise ValueError("Average cost must be 0 or at least 0.000000000001 USD.")
        return value


class HoldingInput(CostInput):
    asset_id: AssetId
    quantity: PositiveAmount
    avg_cost: CostAmount


class HoldingPatch(CostInput):
    quantity: PositiveAmount | None = None
    avg_cost: CostAmount | None = None

    @model_validator(mode="after")
    def require_change(self):
        if not self.model_fields_set or any(getattr(self, k) is None for k in self.model_fields_set):
            raise ValueError("Provide quantity or avg_cost with a numeric value.")
        return self


class Holding(BaseModel):
    id: str
    asset_id: AssetId
    symbol: str
    name: str
    quantity: float
    avg_cost: float
    price: float
    value: float
    cost: float
    profit_loss: float
    profit_loss_pct: float | None
    change_24h_pct: float
    allocation_pct: float
    color: str
    sparkline: list[float]


class Allocation(BaseModel):
    asset_id: AssetId
    symbol: str
    name: str
    pct: float
    color: str


class Insight(BaseModel):
    title: str
    description: str
    tone: Literal["balanced", "concentrated", "empty"]
    concentration_pct: float


class Portfolio(BaseModel):
    is_demo: bool
    holdings: list[Holding]
    total_value: float
    total_cost: float
    profit_loss: float
    profit_loss_pct: float | None
    change_24h: float
    change_24h_pct: float
    allocation: list[Allocation]
    insight: Insight
    market: Market
    updated_at: datetime


class AlertInput(InputModel):
    asset_id: AssetId
    direction: Literal["above", "below"]
    target_price: PositiveAmount


class Alert(BaseModel):
    id: str
    asset_id: AssetId
    symbol: str
    direction: Literal["above", "below"]
    target_price: float
    created_at: datetime
    triggered_at: datetime | None
    status: Literal["watching", "triggered"]


class AlertList(BaseModel):
    alerts: list[Alert]
    market_source: Source
    evaluated_at: datetime


class ChatInput(InputModel):
    message: str = Field(min_length=1, max_length=1200)


class Highlight(BaseModel):
    label: str
    value: str
    detail: str


class ChatResponse(BaseModel):
    mode: Literal["ai", "local"]
    message: str
    highlights: list[Highlight]
    suggested_questions: list[str]
    disclaimer: str
    data_source: Source
    as_of: datetime


class ShareInput(InputModel):
    include_performance: bool = False
    title: str = Field(default="My crypto mix", min_length=1, max_length=60)


class Share(BaseModel):
    is_demo: bool
    slug: str
    title: str
    created_at: datetime
    allocation: list[Allocation]
    profit_loss_pct: float | None
    asset_count: int
    data_source: Source
    as_of: datetime
    maker: str = "Doruk Gezici"
    maker_url: str = "https://github.com/dorukgezici"


class ShareList(BaseModel):
    shares: list[Share]


class EventInput(InputModel):
    name: Literal["share_view", "share_download", "share_copy", "start_clicked", "maker_clicked"]
    referral: str | None = Field(default=None, max_length=32, pattern=r"^[A-Za-z0-9_-]+$")
