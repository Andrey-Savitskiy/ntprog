from starlette.testclient import TestClient

from server.app import app
from server.api.api import MessageType


def test_place_order_event_without_message():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Передано неверное количество параметров в message'"}}


def test_place_order_event_with_incorrect_field():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {'instrument': 'EUR/USD', 'si55de': 'BUY', 'price': 10, 'amount': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Передан неизвестный ключ: si55de'"}}


def test_place_order_event_incorrect_instrument():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {'instrument': '1', 'side': 'BUY', 'price': 10, 'amount': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Инструмент 1 не поддерживается сервером'"}}


def test_place_order_event_incorrect_side():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {'instrument': 'EUR/USD', 'side': 'UPDATE', 'price': 10, 'amount': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Операция UPDATE не поддерживается сервером'"}}


def test_place_order_event_incorrect_price():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {'instrument': 'EUR/USD', 'side': 'SELL', 'price': '', 'amount': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: Поля price и amount должны быть численными"}}


def test_place_order_event_is_ok():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.PLACE_ORDER, 'message': {'instrument': 'EUR/USD', 'side': 'SELL', 'price': 1, 'amount': 1}}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data['messageType'] == MessageType.EXECUTION_REPORT
