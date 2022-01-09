from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update
from telegram.ext import CallbackContext, ConversationHandler

from apps.exchange.models import Asset, Portfolio, PortfolioAsset
from apps.exchange.tasks import (
    calculate_and_report_average_costs_and_charges,
    calculate_and_report_pnls,
    report_portfolio_pnls,
    sync,
)


def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(
        f"Hello {update.effective_user.first_name}. Your Telegram id is {update.effective_user.id}. "
        "You need to forward this message to @dorukgezici to receive setup instructions."
    )
    sync(update.effective_user.id)


def assets(update: Update, context: CallbackContext) -> None:
    update.message.reply_text("Listing portfolio assets...")

    telegram_id = update.effective_user.id
    sync(telegram_id)

    for portfolio_asset in PortfolioAsset.objects.filter(portfolio__user__tg__id=str(telegram_id)):
        update.message.reply_text(
            f"{portfolio_asset.asset.symbol}:\n"
            f"Price = {portfolio_asset.asset.price:.2f} USD\n"
            f"Amount = {portfolio_asset.amount:.2f}\n"
            f"Value = {portfolio_asset.value:.2f} USD\n"
        )


def avg(update: Update, context: CallbackContext) -> None:
    update.message.reply_text("Reporting average costs and charges...")
    calculate_and_report_average_costs_and_charges(update.effective_user.id)


def pnls(update: Update, context: CallbackContext) -> None:
    update.message.reply_text("Reporting portfolio asset PNLs...")
    calculate_and_report_pnls(update.effective_user.id)


def pnl(update: Update, context: CallbackContext) -> None:
    update.message.reply_text("Reporting portfolio PNLs...")
    report_portfolio_pnls(update.effective_user.id)


def pick_asset(update: Update, context: CallbackContext) -> int:
    """Asks for and stores a portfolio asset"""
    existent_symbols = PortfolioAsset.objects.filter(
        portfolio__user__tg__id=str(update.effective_user.id),
    ).values_list('asset__symbol', flat=True)

    assets = list(Asset.objects.exclude(symbol__in=existent_symbols).values_list('symbol', flat=True))

    update.message.reply_text(
        text="Pick the symbol you would like to add.",
        reply_markup=ReplyKeyboardMarkup(
            keyboard=[assets],
            one_time_keyboard=True,
            input_field_placeholder='BTC',
        ),
    )

    return 0


def add_asset(update: Update, context: CallbackContext) -> int:
    """Adds the selected portfolio asset"""
    telegram_id = update.effective_user.id
    symbol = update.message.text
    update.message.reply_text(f"Adding portfolio asset {symbol}...")

    portfolio_asset, _ = PortfolioAsset.objects.get_or_create(
        portfolio=Portfolio.objects.filter(user__tg__id=str(telegram_id)).first(),
        asset=Asset.objects.filter(symbol=symbol).first(),
    )
    calculate_and_report_pnls(telegram_id, False)
    portfolio_asset.refresh_from_db()

    update.message.reply_text(
        f"{portfolio_asset.asset.symbol}:\n"
        f"Price = {portfolio_asset.asset.price:.2f} USD\n"
        f"Amount = {portfolio_asset.amount:.2f}\n"
        f"Value = {portfolio_asset.value:.2f} USD\n"
    )

    return ConversationHandler.END


def cancel(update: Update, context: CallbackContext) -> int:
    """Cancels and ends the conversation"""
    update.message.reply_text(
        text="Bye! I hope we can talk again some day.",
        reply_markup=ReplyKeyboardRemove(),
    )

    return ConversationHandler.END
