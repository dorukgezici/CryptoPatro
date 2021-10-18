import logging
import os

from django.core.management.base import BaseCommand
from telegram import Update
from telegram.ext import CallbackContext, CommandHandler, Updater

from adiutor.exchange.tasks import report_portfolio_pnls

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    update.message.reply_text(f"Hello {user.first_name}. Your id is {user.id}.")


def pnl(update: Update, context: CallbackContext) -> None:
    update.message.reply_text("Reporting portfolio PNLs...")
    report_portfolio_pnls()


class Command(BaseCommand):
    help = 'Run Telegram bot'

    def handle(self, *args, **options) -> None:
        self.stdout.write("Telegram bot starting...")

        updater = Updater(os.environ.get('ADIUTOR_TELEGRAM_BOT_TOKEN'))
        updater.dispatcher.add_handler(CommandHandler('start', start))
        updater.dispatcher.add_handler(CommandHandler('pnl', pnl))
        updater.start_polling()
        updater.idle()
