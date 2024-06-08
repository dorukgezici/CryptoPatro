import logging

from django.conf import settings
from django.core.management.base import BaseCommand
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, ConversationHandler, MessageHandler, filters

from apps.users.telegram import handlers

logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Run Telegram bot"

    def handle(self, *args, **options) -> None:
        self.stdout.write("Telegram bot starting...")

        application = ApplicationBuilder().token(settings.TELEGRAM["bot_token"]).build()

        application.add_handler(CommandHandler("start", handlers.start))
        application.add_handler(CommandHandler("assets", handlers.assets))
        application.add_handler(CommandHandler("avg", handlers.avg))
        application.add_handler(CommandHandler("pnls", handlers.pnls))
        application.add_handler(CommandHandler("pnl", handlers.pnl))

        application.add_handler(
            ConversationHandler(
                entry_points=[CommandHandler("add", handlers.pick_asset)],
                states={
                    0: [
                        MessageHandler(filters.TEXT & ~filters.COMMAND, handlers.add_asset),
                        CommandHandler("cancel", handlers.cancel),
                    ],
                },
                fallbacks=[CommandHandler("cancel", handlers.cancel)],
            ),
        )

        application.run_polling()
