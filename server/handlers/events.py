from datetime import datetime
from starlette.websockets import WebSocket

from server.api.api import *
from server.handlers.messages import send_message
from server.settings import subscribers_object, quotes

subscribers = subscribers_object.subscribers


def check_subscribers(websocket: WebSocket):
    if websocket not in subscribers.keys():
        subscribers[websocket] = {}
    if 'orders_dict' not in subscribers[websocket].keys():
        subscribers[websocket]['orders_dict'] = {}


async def on_subscribe_market_data(websocket: WebSocket, message_body: dict) -> None:
    instrument: str = message_body['instrument']
    if type(instrument) != str:
        raise ValueError("Неверный тип: 'instrument' должно быть строкой.")

    if websocket not in subscribers.keys():
        subscribers[websocket] = {}
        subscribers[websocket]['orders_dict'] = {}

    subscribers[websocket]['instrument'] = instrument

    try:
        ask_price: float = quotes[instrument]['sell']
        bid_price: float = quotes[instrument]['buy']
    except KeyError:
        raise KeyError(f"Инструмент {instrument} не поддерживается сервером")

    await send_message(clients=[websocket], message=SuccessInfo(subscription_id=instrument).to_json())
    await websocket.send_text(MarketDataUpdate(instrument_id=instrument,
                                               ask_price=ask_price,
                                               bid_price=bid_price).to_json())


async def on_unsubscribe_market_data(websocket: WebSocket) -> None:
    try:
        subscribers[websocket].pop('instrument')
    except KeyError:
        pass


async def on_place_order(websocket: WebSocket, message_body: dict, now_time: datetime) -> None:
    if len(message_body.keys()) == 4:
        for key in message_body.keys():
            if key not in ['instrument', 'side', 'price', 'amount']:
                raise KeyError(f"Передан неизвестный ключ: {key}")
    else:
        raise KeyError(f"Передано неверное количество параметров в message")

    if message_body['instrument'] not in quotes.keys():
        raise KeyError(f"Инструмент {message_body['instrument']} не поддерживается сервером")

    if message_body['side'] not in ['SELL', 'BUY']:
        raise KeyError(f"Операция {message_body['side']} не поддерживается сервером")

    try:
        float(message_body['price'])
        float(message_body['amount'])
    except ValueError:
        raise ValueError(f"Поля price и amount должны быть численными")

    message_body['ID'] = now_time.timestamp()
    message_body['creation_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
    message_body['change_time'] = message_body['creation_time']
    message_body['status'] = 'Active'

    check_subscribers(websocket)

    subscribers[websocket]['orders_dict'][message_body['ID']] = message_body

    await websocket.send_text(ExecutionReport(message_body).to_json())


async def on_cancel_order(websocket: WebSocket, message_body: dict, now_time: datetime) -> None:
    check_subscribers(websocket)

    orders_dict: dict = subscribers[websocket]['orders_dict']

    try:
        order_id = float(message_body['order_id'])
    except ValueError:
        raise ValueError(f"Поле order_id должно быть численным")

    if order_id not in orders_dict:
        raise KeyError(f"Такого заказа не существует на сервере.")

    if orders_dict[order_id]['status'] != 'Cancelled':
        orders_dict[order_id]['change_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")
        orders_dict[order_id]['status'] = 'Cancelled'

        await websocket.send_text(ExecutionReport(orders_dict[order_id]).to_json())


async def on_unknown_event(websocket: WebSocket) -> None:
    await send_message(clients=[websocket], message=ErrorInfo(reason='Сообщение неизвестного типа').to_json())
