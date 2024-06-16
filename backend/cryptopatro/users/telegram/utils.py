from typing import List, Optional, Union

import telegram
from django.conf import settings
from telegram import MessageEntity
from telegram._utils.types import ReplyMarkup
from telegram.constants import ParseMode


async def send_message(
    user_id: Union[str, int],
    text: str,
    parse_mode: Optional[str] = ParseMode.HTML,
    reply_markup: Optional[ReplyMarkup] = None,
    reply_to_message_id: Optional[int] = None,
    disable_web_page_preview: Optional[bool] = None,
    entities: Optional[List[MessageEntity]] = None,
) -> bool:
    bot = telegram.Bot(settings.TELEGRAM["bot_token"])

    async with bot:
        try:
            await bot.send_message(
                chat_id=user_id,
                text=text,
                parse_mode=parse_mode,
                reply_markup=reply_markup,
                reply_to_message_id=reply_to_message_id,
                disable_web_page_preview=disable_web_page_preview,
                entities=entities,
            )
        except telegram.error.InvalidToken:
            return False
        else:
            return True
