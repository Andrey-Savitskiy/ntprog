from datetime import datetime
from server.handlers.events import *
from server.handlers.messages import send_message


async def parser_api(message: dict, websocket: WebSocket) -> None:
    try:
        print(message)
        message_type = message['messageType']
        message_body = message['message']
        now_time = datetime.now()

        if message_type == MessageType.SUBSCRIBE_MARKET_DATA:
            await on_subscribe_market_data(websocket, message_body)

        elif message_type == MessageType.UNSUBSCRIBE_MARKET_DATA:
            await on_unsubscribe_market_data(websocket)

        elif message_type == MessageType.PLACE_ORDER:
            await on_place_order(websocket, message_body, now_time)

        elif message_type == MessageType.CANCEL_ORDER:
            await on_cancel_order(websocket, message_body, now_time)

        else:
            await on_unknown_event(websocket)

    except Exception as error:
        await send_message(clients=[websocket], message=ErrorInfo(reason=f'Ошибка сервера: {error}').to_json())
