from loguru import logger
from starlette.websockets import WebSocket

logger.add('logs/debug.log', level="WARNING", rotation="50 MB", compression='zip',
           enqueue=True, backtrace=True, diagnose=True)

quotes = {
    'EUR/USD': {'buy': 1., 'sell': 1.},
    'EUR/RUB': {'buy': 92.5, 'sell': 92.3},
    'USD/RUB': {'buy': 84.7, 'sell': 84.66},
}


class Subscribers:
    def __init__(self):
        """
        subscribers = {
            websocket: {
                'instrument': '',
                'orders_dict': {
                    order_id: {order}
                }
            }
        }
        """
        self.subscribers = {}

    def set_subscribers(self, websocket: WebSocket):
        self.subscribers[websocket] = {}

    def pop_subscribers(self, websocket: WebSocket):
        self.subscribers.pop(websocket, 10)


subscribers_object = Subscribers()
