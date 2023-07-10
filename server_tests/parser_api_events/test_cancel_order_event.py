from starlette.testclient import TestClient

from server.app import app
from server.api.api import MessageType


def test_cancel_order_event_without_order_id():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.CANCEL_ORDER, 'message': {}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'order_id'"}}


def test_cancel_order_event_incorrect_order_id():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.CANCEL_ORDER, 'message': {'order_id': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Такого заказа не существует на сервере.'"}}
