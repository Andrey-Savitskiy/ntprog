from datetime import datetime
from starlette.websockets import WebSocket

from server.api.api import *
from server.handlers.messages import send_message
from server.settings import subscribers_object, quotes

subscribers = subscribers_object.subscribers


async def on_subscribe_market_data(websocket: WebSocket, message_body: dict) -> int:
    instrument: str = message_body['instrument']

    if websocket not in subscribers.keys():
        subscribers[websocket] = {}
        subscribers[websocket]['orders_dict'] = {}

    subscribers[websocket]['instrument'] = instrument

    ask_price: float = quotes[instrument]['sell']
    bid_price: float = quotes[instrument]['buy']

    await send_message(clients=[websocket], message=SuccessInfo(subscription_id=instrument).to_json())
    await websocket.send_text(MarketDataUpdate(instrument_id=instrument,
                                               ask_price=ask_price,
                                               bid_price=bid_price).to_json())
    return 0


async def on_unsubscribe_market_data(websocket: WebSocket) -> int:
    try:
        subscribers[websocket].pop('instrument')
        return 0
    except KeyError:
        return -1


async def on_place_order(websocket: WebSocket, message_body: dict, now_time: datetime) -> int:
    message_body['ID'] = now_time.timestamp()
    message_body['creation_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
    message_body['change_time'] = message_body['creation_time']
    message_body['status'] = 'Active'

    subscribers[websocket]['orders_dict'][message_body['ID']] = message_body
    await websocket.send_text(ExecutionReport(message_body).to_json())

    return 0


async def on_cancel_order(websocket: WebSocket, message_body: dict, now_time: datetime) -> int:
    orders_dict: dict = subscribers[websocket]['orders_dict']
    order_id = float(message_body['order_id'])

    if orders_dict[order_id]['status'] != 'Cancelled':
        orders_dict[order_id]['change_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
        orders_dict[order_id]['status'] = 'Cancelled'

        await websocket.send_text(ExecutionReport(orders_dict[order_id]).to_json())

    return 0


async def on_unknown_event(websocket: WebSocket) -> int:
    await send_message(clients=[websocket], message=ErrorInfo(reason='Сообщение неизвестного типа').to_json())
    return 0
