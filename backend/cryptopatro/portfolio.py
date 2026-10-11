from datetime import UTC, datetime
from decimal import Decimal

from .schemas import Allocation, Holding, Insight, Market, Portfolio


def number(value: Decimal, precision: int = 2) -> float:
    return round(float(value), precision)


def build_portfolio(rows: list[dict], market: Market, is_demo: bool) -> Portfolio:
    assets = {asset.id: asset for asset in market.assets}
    values = {
        row["id"]: Decimal(str(row["quantity"])) * Decimal(str(assets[row["asset_id"]].price)) for row in rows
    }
    total = sum(values.values(), Decimal(0))
    costs = {row["id"]: Decimal(str(row["quantity"])) * Decimal(str(row["avg_cost"])) for row in rows}
    cost = sum(costs.values(), Decimal(0))
    basis_complete = bool(rows) and all(costs[row["id"]] > 0 for row in rows)
    known_profit = sum(
        (values[row["id"]] - costs[row["id"]] for row in rows if costs[row["id"]] > 0), Decimal(0)
    )
    previous = sum(
        (
            values[row["id"]] / (1 + Decimal(str(assets[row["asset_id"]].change_24h_pct)) / 100)
            for row in rows
        ),
        Decimal(0),
    )
    holdings = []
    for row in rows:
        asset = assets[row["asset_id"]]
        value, row_cost = values[row["id"]], costs[row["id"]]
        holdings.append(
            Holding(
                id=row["id"],
                asset_id=row["asset_id"],
                symbol=asset.symbol,
                name=asset.name,
                quantity=row["quantity"],
                avg_cost=row["avg_cost"],
                price=asset.price,
                value=number(value),
                cost=number(row_cost),
                profit_loss=number(value - row_cost) if row_cost else 0,
                profit_loss_pct=number((value - row_cost) / row_cost * 100) if row_cost else None,
                change_24h_pct=asset.change_24h_pct,
                allocation_pct=number(value / total * 100) if total else 0,
                color=asset.color,
                sparkline=asset.sparkline,
            )
        )
    holdings.sort(key=lambda h: h.value, reverse=True)
    allocation = [
        Allocation(asset_id=h.asset_id, name=h.name, symbol=h.symbol, pct=h.allocation_pct, color=h.color)
        for h in holdings
    ]
    if not holdings:
        insight = Insight(
            title="Your first holding starts the picture",
            description=(
                "Add an asset and its average purchase price to see your mix and unrealized return."
            ),
            tone="empty",
            concentration_pct=0,
        )
    else:
        largest = holdings[0]
        concentrated = largest.allocation_pct >= 50
        insight = Insight(
            title=f"{largest.name} is your largest position",
            description=(
                f"{largest.symbol} makes up {largest.allocation_pct:.1f}% of your tracked value. "
                + (
                    "Its price movements have the biggest influence on this portfolio."
                    if concentrated
                    else "Your value is spread across several positions."
                )
                + " Allocation alone does not measure total risk."
            ),
            tone="concentrated" if concentrated else "balanced",
            concentration_pct=largest.allocation_pct,
        )
    return Portfolio(
        is_demo=is_demo,
        holdings=holdings,
        total_value=number(total),
        total_cost=number(cost),
        profit_loss=number(known_profit),
        profit_loss_pct=number((total - cost) / cost * 100) if basis_complete else None,
        change_24h=number(total - previous),
        change_24h_pct=number((total - previous) / previous * 100) if previous else 0,
        allocation=allocation,
        insight=insight,
        market=market,
        updated_at=datetime.now(UTC),
    )
