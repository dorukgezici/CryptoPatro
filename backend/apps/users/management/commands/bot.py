import logging

from django.conf import settings
from django.core.management.base import BaseCommand
from telegram.ext import (
    CommandHandler,
    ConversationHandler,
    Filters,
    MessageHandler,
    Updater,
)

from apps.users.telegram import handlers

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Run Telegram bot"

    def handle(self, *args, **options) -> None:
        self.stdout.write("Telegram bot starting...")

        updater = Updater(settings.TELEGRAM["bot_token"])

        updater.dispatcher.add_handler(CommandHandler("start", handlers.start))
        updater.dispatcher.add_handler(CommandHandler("assets", handlers.assets))
        updater.dispatcher.add_handler(CommandHandler("avg", handlers.avg))
        updater.dispatcher.add_handler(CommandHandler("pnls", handlers.pnls))
        updater.dispatcher.add_handler(CommandHandler("pnl", handlers.pnl))

        updater.dispatcher.add_handler(
            ConversationHandler(
                entry_points=[CommandHandler("add", handlers.pick_asset)],
                states={
                    0: [
                        MessageHandler(
                            Filters.text & ~Filters.command, handlers.add_asset
                        ),
                        CommandHandler("cancel", handlers.cancel),
                    ],
                },
                fallbacks=[CommandHandler("cancel", handlers.cancel)],
            ),
        )

        updater.start_polling()
        updater.idle()
