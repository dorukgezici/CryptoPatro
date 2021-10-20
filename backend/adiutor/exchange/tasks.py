from decimal import Decimal
from typing import Optional

import binance.error
from binance.spot import Spot
from django.db.models import Sum

from adiutor.users.models import BinanceAuth, User
from adiutor.users.telegram.utils import send_message
from .models import Asset, Portfolio, PortfolioAsset
from ..celery_app import app


@app.task
def synchronize_prices(telegram_id: Optional[int] = None) -> None:
    if telegram_id is not None:
        binance_auth = BinanceAuth.objects.filter(user__tg__id=str(telegram_id)).first()
    else:
        binance_auth = BinanceAuth.objects.first()

    client = Spot(key=binance_auth.api_key, secret=binance_auth.api_secret)

    for ticker_price_data in client.ticker_price():
        symbol, price = ticker_price_data['symbol'], ticker_price_data['price']

        if symbol.endswith('USDT'):
            Asset.objects.filter(symbol=symbol.removesuffix('USDT')).update(price=price)


@app.task
def synchronize_balances(telegram_id: Optional[int] = None) -> None:
    users = User.objects.filter(binance__isnull=False)
    assets = {}

    if telegram_id is not None:
        users = users.filter(tg__id=str(telegram_id))

    for user in users:
        client = Spot(key=user.binance.api_key, secret=user.binance.api_secret)

        for data in client.account()['balances']:
            asset = data['asset']
            free = Decimal(data['free'])
            locked = Decimal(data['locked'])

            # Hack to combine ETH and BETH balances
            if asset in ['ETH', 'BETH']:
                try:
                    eth = assets['ETH']
                except KeyError:
                    eth = {
                        'free': 0,
                        'locked': 0,
                    }

                assets['ETH'] = {
                    'free': eth['free'] + free,
                    'locked': eth['locked'] + locked,
                }
            else:
                assets[asset] = {
                    'free': free,
                    'locked': locked,
                }

        for portfolio_asset in PortfolioAsset.objects.filter(
            asset__symbol__in=assets.keys(),
            portfolio__user=user,
        ):
            asset = assets[portfolio_asset.asset.symbol]
            portfolio_asset.amount = asset['free'] + asset['locked']
            portfolio_asset.value = portfolio_asset.amount * portfolio_asset.asset.price
            portfolio_asset.save(update_fields=['amount', 'value'])


@app.task
def sync(telegram_id: Optional[int] = None) -> None:
    synchronize_balances(telegram_id)
    synchronize_prices(telegram_id)


@app.task
def calculate_and_report_average_costs_and_charges(telegram_id: Optional[int] = None, report: bool = True) -> None:
    portfolio_assets = PortfolioAsset.objects.filter(portfolio__user__binance__isnull=False)

    if telegram_id is not None:
        portfolio_assets = portfolio_assets.filter(portfolio__user__tg__id=str(telegram_id))

    for portfolio_asset in portfolio_assets:
        user = portfolio_asset.portfolio.user
        symbol = portfolio_asset.asset.symbol
        client = Spot(key=user.binance.api_key, secret=user.binance.api_secret)

        buy_quantity = Decimal(0)
        cost = Decimal(0)

        sell_quantity = Decimal(0)
        charge = Decimal(0)

        for symbol in [f'{symbol}USDT', f'{symbol}BUSD', f'{symbol}BTC']:
            try:
                my_trades_data = client.my_trades(symbol=symbol, limit=1000)
            except binance.error.ClientError:
                continue

            for data in my_trades_data:
                is_buyer: bool = data['isBuyer']
                qty = Decimal(data['qty'])
                quote_qty = Decimal(data['quoteQty'])

                # Hack to calculate USD values of /BTC trades
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

        if buy_quantity > 0:
            portfolio_asset.avg_cost = cost / buy_quantity
            portfolio_asset.buy_amount = buy_quantity

            portfolio_asset.save(update_fields=['avg_cost', 'buy_amount'])

        if sell_quantity > 0:
            portfolio_asset.avg_charge = charge / sell_quantity
            portfolio_asset.sell_amount = sell_quantity

            portfolio_asset.save(update_fields=['avg_charge', 'sell_amount'])

        if report:
            send_message(
                user.tg.id,
                f'{portfolio_asset.asset.symbol}:\n'
                f'Avg. Cost = {portfolio_asset.avg_cost:.2f} USD\n'
                f'Avg. Charge = {portfolio_asset.avg_charge:.2f} USD\n',
            )


@app.task
def calculate_and_report_pnls(telegram_id: Optional[int] = None, report: bool = True) -> None:
    portfolio_assets = PortfolioAsset.objects.filter(portfolio__user__binance__isnull=False).exclude(asset__price=0)

    if telegram_id is not None:
        portfolio_assets = portfolio_assets.filter(portfolio__user__tg__id=str(telegram_id))
        sync(telegram_id)
        calculate_and_report_average_costs_and_charges(telegram_id, False)

    for portfolio_asset in portfolio_assets:
        amount, price = portfolio_asset.amount, portfolio_asset.asset.price
        avg_cost, avg_charge = portfolio_asset.avg_cost, portfolio_asset.avg_charge

        portfolio_asset.value = amount * price
        portfolio_asset.save(update_fields=['value'])

        if avg_cost > 0:
            unrealized_pnl = amount * (price - avg_cost)
            portfolio_asset.unrealized_pnl = unrealized_pnl
            portfolio_asset.save(update_fields=['unrealized_pnl'])

            if avg_charge > 0:
                realized_pnl = portfolio_asset.sell_amount * avg_charge - portfolio_asset.buy_amount * avg_cost
                portfolio_asset.realized_pnl = realized_pnl
                portfolio_asset.save(update_fields=['realized_pnl'])

        if report:
            unrealized_percentage = 0
            realized_percentage = 0

            if avg_cost > 0:
                unrealized_percentage = (price - avg_cost) / avg_cost * 100

                if avg_charge > 0:
                    realized_percentage = (avg_charge - avg_cost) / avg_cost * 100

            send_message(
                portfolio_asset.portfolio.user.tg.id,
                f'{portfolio_asset.asset.symbol}:\n'
                f'Amount = {amount:.2f}\n'
                f'Value = {portfolio_asset.value:.2f} USD\n'
                f'Real. P&L = {portfolio_asset.realized_pnl:.2f} USD ({realized_percentage:.2f}%)\n'
                f'Unr. P&L = {portfolio_asset.unrealized_pnl:.2f} USD ({unrealized_percentage:.2f}%)\n'
            )


@app.task
def call_of_duty(report: bool = True) -> None:
    sync()
    calculate_and_report_average_costs_and_charges(report=report)
    calculate_and_report_pnls(report=report)


@app.task
def report_portfolio_pnls(telegram_id: Optional[int] = None) -> None:
    portfolios = Portfolio.objects.filter(user__binance__isnull=False)

    if telegram_id is not None:
        portfolios = portfolios.filter(user__tg__id=str(telegram_id))
        calculate_and_report_pnls(telegram_id, False)
    else:
        call_of_duty(report=False)

    for portfolio in portfolios:
        if portfolio.portfolioasset_set.exists():
            data = portfolio.portfolioasset_set.aggregate(Sum('value'), Sum('realized_pnl'), Sum('unrealized_pnl'))
            value = data['value__sum']
            realized_pnl = data['realized_pnl__sum']
            unrealized_pnl = data['unrealized_pnl__sum']

            realized_percentage = realized_pnl / (value - unrealized_pnl) * 100
            unrealized_percentage = unrealized_pnl / (value - realized_pnl) * 100

            send_message(
                portfolio.user.tg.id,
                f'{portfolio}:\n'
                f'Value = {value:.2f} USD\n'
                f'Real. P&L = {realized_pnl:.2f} USD ({realized_percentage:.2f}%)\n'
                f'Unr. P&L = {unrealized_pnl:.2f} USD ({unrealized_percentage:.2f}%)\n'
            )
