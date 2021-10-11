import logging
import os

from telegram import Update
from telegram.ext import CallbackContext, CommandHandler, Updater

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    update.message.reply_text(f'Hello {user.first_name}. Your id is {user.id}.')


if __name__ == '__main__':
    updater = Updater(os.environ.get('ADIUTOR_TELEGRAM_BOT_TOKEN'))
    updater.dispatcher.add_handler(CommandHandler('start', start))
    updater.start_polling()
    updater.idle()
