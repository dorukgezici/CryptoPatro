from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update
from telegram.ext import ContextTypes, ConversationHandler

from cryptopatro.exchange.models import Asset, Portfolio, PortfolioAsset
from cryptopatro.exchange.tasks import (
    calculate_average_costs_and_charges,
    calculate_portfolio_asset_pnls,
    report_portfolio_pnls,
    sync,
)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    sync.delay(update.effective_user.id)

    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"Hello {update.effective_user.first_name}. Your Telegram id is {update.effective_user.id}. "
        "You need to forward this message to @dorukgezici to receive setup instructions.",
    )


async def assets(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    sync.delay(update.effective_user.id)

    await context.bot.send_message(chat_id=update.effective_chat.id, text="Listing portfolio assets...")

    for portfolio_asset in PortfolioAsset.objects.filter(portfolio__user__tg__id=str(update.effective_user.id)):
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=f"{portfolio_asset.asset.symbol}:\n"
            f"Price = {portfolio_asset.asset.price:.2f} USD\n"
            f"Amount = {portfolio_asset.amount:.2f}\n"
            f"Value = {portfolio_asset.value:.2f} USD\n",
        )


async def avg(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    calculate_average_costs_and_charges.delay(update.effective_user.id)

    await context.bot.send_message(chat_id=update.effective_chat.id, text="Reporting average costs and charges...")


async def pnls(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    calculate_portfolio_asset_pnls.delay(update.effective_user.id)

    await context.bot.send_message(chat_id=update.effective_chat.id, text="Reporting portfolio asset PNLs...")


async def pnl(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    report_portfolio_pnls.delay(update.effective_user.id)

    await context.bot.send_message(chat_id=update.effective_chat.id, text="Reporting portfolio PNLs...")


async def pick_asset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Asks for and stores a portfolio asset"""
    existent_symbols = PortfolioAsset.objects.filter(
        portfolio__user__tg__id=str(update.effective_user.id),
    ).values_list("asset__symbol", flat=True)

    assets = list(Asset.objects.exclude(symbol__in=existent_symbols).values_list("symbol", flat=True))

    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Pick the symbol you would like to add.",
        reply_markup=ReplyKeyboardMarkup(
            keyboard=[assets],
            one_time_keyboard=True,
            input_field_placeholder="BTC",
        ),
    )

    return 0


async def add_asset(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Adds the selected portfolio asset"""
    telegram_id = update.effective_user.id
    symbol = update.message.text
    await context.bot.send_message(chat_id=update.effective_chat.id, text=f"Adding portfolio asset {symbol}...")

    portfolio_asset, _ = PortfolioAsset.objects.get_or_create(
        portfolio=Portfolio.objects.filter(user__tg__id=str(telegram_id)).first(),
        asset=Asset.objects.filter(symbol=symbol).first(),
    )
    report_portfolio_pnls(telegram_id, False)
    portfolio_asset.refresh_from_db()

    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text=f"{portfolio_asset.asset.symbol}:\n"
        f"Price = {portfolio_asset.asset.price:.2f} USD\n"
        f"Amount = {portfolio_asset.amount:.2f}\n"
        f"Value = {portfolio_asset.value:.2f} USD\n",
    )

    return ConversationHandler.END


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancels and ends the conversation"""
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="Bye! I hope we can talk again some day.",
        reply_markup=ReplyKeyboardRemove(),
    )

    return ConversationHandler.END
