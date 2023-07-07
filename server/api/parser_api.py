from datetime import datetime

from starlette.websockets import WebSocket
from server.api.api import *
from server.handlers.messages import send_message
from server.settings import subscribers_object, quotes


async def parser_api(message: dict, websocket: WebSocket) -> None:
    try:
        print(message)
        message_type = message['messageType']
        message_body = message['message']
        now_time = datetime.now()

        subscribers = subscribers_object.subscribers

        if message_type == MessageType.SUBSCRIBE_MARKET_DATA:
            instrument = message_body['instrument']

            if websocket not in subscribers.keys():
                subscribers[websocket] = {}
                subscribers[websocket]['orders_dict'] = {}

            subscribers[websocket]['instrument'] = instrument
            await send_message(clients=[websocket], message=SuccessInfo(subscription_id=instrument).to_json())

            ask_price = quotes[instrument]['sell']
            bid_price = quotes[instrument]['buy']
            await websocket.send_text(MarketDataUpdate(instrument_id=instrument,
                                                       ask_price=ask_price,
                                                       bid_price=bid_price).to_json())

        elif message_type == MessageType.UNSUBSCRIBE_MARKET_DATA:
            try:
                subscribers[websocket].pop('instrument')
                print(subscribers)
            except KeyError:
                return

        elif message_type == MessageType.PLACE_ORDER:
            message_body['ID'] = now_time.timestamp()
            message_body['creation_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
            message_body['change_time'] = message_body['creation_time']
            message_body['status'] = 'Active'

            subscribers[websocket]['orders_dict'][message_body['ID']] = message_body
            await websocket.send_text(ExecutionReport(message_body).to_json())

        elif message_type == MessageType.CANCEL_ORDER:
            orders_dict: dict = subscribers[websocket]['orders_dict']
            order_id = float(message_body['order_id'])

            if orders_dict[order_id]['status'] != 'Cancelled':
                orders_dict[order_id]['change_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
                orders_dict[order_id]['status'] = 'Cancelled'

                await websocket.send_text(ExecutionReport(orders_dict[order_id]).to_json())

    except Exception as error:
        await send_message(clients=[websocket], message=ErrorInfo(reason=f'Ошибка сервера: {error}').to_json())
