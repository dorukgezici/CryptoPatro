from typing import Dict, List, Optional, Union

import telegram
from django.conf import settings
from telegram import MessageEntity


def _send_message(
    user_id: Union[str, int],
    text: str,
    parse_mode: Optional[str] = telegram.ParseMode.HTML,
    reply_markup: Optional[List[List[Dict]]] = None,
    reply_to_message_id: Optional[int] = None,
    disable_web_page_preview: Optional[bool] = None,
    entities: Optional[List[MessageEntity]] = None,
    tg_token: str = settings.TELEGRAM['bot_token'],
) -> bool:
    bot = telegram.Bot(tg_token)

    try:
        m = bot.send_message(
            chat_id=user_id,
            text=text,
            parse_mode=parse_mode,
            reply_markup=reply_markup,
            reply_to_message_id=reply_to_message_id,
            disable_web_page_preview=disable_web_page_preview,
            entities=entities,
        )
    except telegram.error.Unauthorized:
        print(f"Can't send message to {user_id}. Reason: Bot was stopped.")
        success = False
    else:
        success = True

    return success
