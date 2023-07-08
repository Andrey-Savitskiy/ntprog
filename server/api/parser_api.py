from server.handlers.events import *


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

    except (KeyError, ValueError) as error:
        await websocket.send_json(ErrorInfo(reason=f'Ошибка в формате сообщения: {error}').to_json())
