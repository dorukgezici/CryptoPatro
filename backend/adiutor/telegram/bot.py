import logging

from django.conf import settings
from telegram import Update
from telegram.ext import CallbackContext, CommandHandler, Updater

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text(f'Hello {update.effective_user.first_name}')


if __name__ == '__main__':
    updater = Updater(settings.TELEGRAM['bot_token'])
    updater.dispatcher.add_handler(CommandHandler('start', start))
    updater.start_polling()
    updater.idle()
