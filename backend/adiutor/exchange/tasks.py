from decimal import Decimal

import binance.error
from binance.spot import Spot
from django.db.models import Sum

from .models import Portfolio, PortfolioAsset
from ..celery_app import app
from ..telegram.utils import _send_message
from ..users.models import BinanceAuth, User


@app.task
def get_current_prices() -> dict:
    binance_auth = BinanceAuth.objects.first()
    client = Spot(key=binance_auth.api_key, secret=binance_auth.api_secret)

    prices = {}
    for ticker_price_data in client.ticker_price():
        prices[ticker_price_data['symbol']] = ticker_price_data['price']

    return prices


@app.task
def synchronize_balances() -> None:
    users = User.objects.filter(binance__isnull=False)
    assets = {}

    for user in users:
        client = Spot(key=user.binance.api_key, secret=user.binance.api_secret)

        for data in client.account()['balances']:
            asset = data['asset']
            free = Decimal(data['free'])
            locked = Decimal(data['locked'])

            assets[asset] = {
                'free': free,
                'locked': locked,
            }

        for portfolio_asset in PortfolioAsset.objects.filter(
            asset__ticker__in=assets.keys(),
            portfolio__user=user,
        ):
            asset = assets[portfolio_asset.asset.ticker]
            portfolio_asset.amount = asset['free'] + asset['locked']
            portfolio_asset.save(update_fields=['amount'])


@app.task
def calculate_and_report_average_costs_and_charges(report: bool = True) -> None:
    for portfolio_asset in PortfolioAsset.objects.filter(portfolio__user__binance__isnull=False):
        user = portfolio_asset.portfolio.user
        ticker = portfolio_asset.asset.ticker
        client = Spot(key=user.binance.api_key, secret=user.binance.api_secret)

        buy_quantity = Decimal(0)
        cost = Decimal(0)

        sell_quantity = Decimal(0)
        charge = Decimal(0)

        for symbol in [f'{ticker}USDT', f'{ticker}BUSD', f'{ticker}BTC']:
            try:
                my_trades_data = client.my_trades(symbol=symbol, limit=1000)
            except binance.error.ClientError:
                continue

            for data in my_trades_data:
                is_buyer: bool = data['isBuyer']
                qty = Decimal(data['qty'])
                quote_qty = Decimal(data['quoteQty'])

                if symbol.endswith('BTC'):
                    btc_price = Decimal(
                        client.agg_trades(
                            symbol='BTCUSDT',
                            startTime=data['time'] - 100000,
                            endTime=data['time'] + 100000,
                        )[0]['p'],
                    )
                    quote_qty = quote_qty * btc_price

                if is_buyer:
                    buy_quantity += qty
                    cost += quote_qty
                else:
                    sell_quantity += qty
                    charge += quote_qty

        portfolio_asset.avg_cost = cost / buy_quantity if buy_quantity > 0 else 0
        portfolio_asset.buy_amount = buy_quantity

        portfolio_asset.avg_charge = charge / sell_quantity if sell_quantity > 0 else 0
        portfolio_asset.sell_amount = sell_quantity

        portfolio_asset.save(update_fields=['avg_cost', 'buy_amount', 'avg_charge', 'sell_amount'])

        if report:
            _send_message(
                user.tg.id,
                f'{ticker}:\n'
                f'Avg. Cost = {portfolio_asset.avg_cost:.2f} USD\n'
                f'Avg. Charge = {portfolio_asset.avg_charge:.2f} USD\n',
            )


@app.task
def calculate_and_report_pnls(report: bool = True) -> None:
    prices = get_current_prices()

    for portfolio_asset in PortfolioAsset.objects.filter(portfolio__user__binance__isnull=False):
        user = portfolio_asset.portfolio.user
        ticker = portfolio_asset.asset.ticker
        avg_cost = portfolio_asset.avg_cost
        avg_charge = portfolio_asset.avg_charge
        symbol = f'{ticker}USDT'

        if symbol in prices:
            current_price = Decimal(prices[symbol])
            value = portfolio_asset.amount * current_price
            realized_pnl = portfolio_asset.sell_amount * (avg_charge - avg_cost)
            unrealized_pnl = portfolio_asset.amount * (current_price - avg_cost)

            portfolio_asset.value = value
            portfolio_asset.realized_pnl = realized_pnl
            portfolio_asset.unrealized_pnl = unrealized_pnl
            portfolio_asset.save(update_fields=['value', 'realized_pnl', 'unrealized_pnl'])

            if report:
                realized_percentage = ((avg_charge - avg_cost) / avg_cost * 100) if avg_cost > 0 else 0
                unrealized_percentage = ((current_price - avg_cost) / avg_cost * 100) if avg_cost > 0 else 0

                _send_message(
                    user.tg.id,
                    f'{ticker}:\n'
                    f'Value = {value:.2f} USD\n'
                    f'Real. P&L = {realized_pnl:.2f} USD ({realized_percentage:.2f}%)\n'
                    f'Unr. P&L = {unrealized_pnl:.2f} USD ({unrealized_percentage:.2f}%)\n'
                )


@app.task
def call_of_duty(report: bool = True) -> None:
    synchronize_balances()
    calculate_and_report_average_costs_and_charges(report)
    calculate_and_report_pnls(report)


@app.task
def report_portfolio_pnls() -> None:
    call_of_duty(report=False)

    for portfolio in Portfolio.objects.filter(user__binance__isnull=False):
        portfolio_assets = portfolio.portfolioasset_set.all()

        data = portfolio_assets.aggregate(Sum('value'), Sum('realized_pnl'), Sum('unrealized_pnl'))
        value = data['value__sum']
        realized_pnl = data['realized_pnl__sum']
        unrealized_pnl = data['unrealized_pnl__sum']

        realized_percentage = realized_pnl / (value - unrealized_pnl) * 100
        unrealized_percentage = unrealized_pnl / (value - realized_pnl) * 100

        _send_message(
            portfolio.user.tg.id,
            f'{portfolio}:\n'
            f'Value = {value:.2f} USD\n'
            f'Real. P&L = {realized_pnl:.2f} USD ({realized_percentage:.2f}%)\n'
            f'Unr. P&L = {unrealized_pnl:.2f} USD ({unrealized_percentage:.2f}%)\n'
        )
