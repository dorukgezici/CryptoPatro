import logging
import os

from django.core.management.base import BaseCommand
from telegram import Update
from telegram.ext import CallbackContext, CommandHandler, Updater

from adiutor.exchange.models import PortfolioAsset
from adiutor.exchange.tasks import (
    calculate_and_report_average_costs_and_charges,
    calculate_and_report_pnls,
    report_portfolio_pnls,
    sync,
)

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


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


class Command(BaseCommand):
    help = 'Run Telegram bot'

    def handle(self, *args, **options) -> None:
        self.stdout.write("Telegram bot starting...")

        updater = Updater(os.environ.get('ADIUTOR_TELEGRAM_BOT_TOKEN'))
        updater.dispatcher.add_handler(CommandHandler('start', start))
        updater.dispatcher.add_handler(CommandHandler('assets', assets))
        updater.dispatcher.add_handler(CommandHandler('avg', avg))
        updater.dispatcher.add_handler(CommandHandler('pnls', pnls))
        updater.dispatcher.add_handler(CommandHandler('pnl', pnl))
        updater.start_polling()
        updater.idle()
