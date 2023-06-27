import json


class MessageType:
    SUBSCRIBE_MARKET_DATA, UNSUBSCRIBE_MARKET_DATA, PLACE_ORDER, CANCEL_ORDER, SUCCESS_INFO,\
        ERROR_INFO, EXECUTION_REPORT, UPDATE_MARKET_DATA = range(1, 9)


class Message:
    def __init__(self, message_type, message=None):
        self.message_type = message_type
        self.message = message

    def to_json(self):
        return json.dumps({
            "messageType": self.message_type,
            "message": self.message
        })


def subscribe_market_data(instrument):
    message = {"instrument": instrument}
    return Message(MessageType.SUBSCRIBE_MARKET_DATA, message).to_json()


def unsubscribe_market_data(subscription_id):
    message = {"subscriptionId": subscription_id}
    return Message(MessageType.UNSUBSCRIBE_MARKET_DATA, message).to_json()


def place_order(instrument, quantity, price):
    message = {
        "instrument": instrument,
        "quantity": quantity,
        "price": price
    }
    return Message(MessageType.PLACE_ORDER, message).to_json()


def cancel_order(order_id):
    message = {"orderId": order_id}
    return Message(MessageType.CANCEL_ORDER, message).to_json()


class SuccessInfo:
    def __init__(self, subscription_id: int):
        self.subscription_id = subscription_id

    def to_json(self):
        message = {"subscriptionId": self.subscription_id}
        return Message(message_type=MessageType.SUCCESS_INFO, message=message).to_json()


class ErrorInfo:
    def __init__(self, reason: str):
        self.reason = reason

    def to_json(self):
        message = {"reason": self.reason}
        return Message(message_type=MessageType.ERROR_INFO, message=message).to_json()


class ExecutionReport:
    def __init__(self, order_id, instrument, quantity, price, execution_time):
        self.order_id = order_id
        self.instrument = instrument,
        self.quantity = quantity
        self.price = price
        self.execution_time = execution_time

    def to_json(self):
        message = {
            "orderId": self.order_id,
            "instrument": self.instrument,
            "quantity": self.quantity,
            "price": self.price,
            "executionTime": self.execution_time
        }
        return Message(message_type=MessageType.EXECUTION_REPORT, message=message).to_json()


class MarketDataUpdate:
    def __init__(self, instrument_id: int, bid_price: float, ask_price: float):
        self.instrument_id = instrument_id
        self.bid_price = bid_price
        self.ask_price = ask_price

    def to_json(self) -> json:
        message = {
            "instrument_id": self.instrument_id,
            "bidPrice": self.bid_price,
            "askPrice": self.ask_price,
        }
        return Message(message_type=MessageType.UPDATE_MARKET_DATA, message=message).to_json()
