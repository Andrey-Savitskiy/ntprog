import json
from starlette.testclient import TestClient

from server.app import app
from server.api.api import MessageType


def test_subscribe_market_data_event_without_message():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.SUBSCRIBE_MARKET_DATA, 'message': {}}
        websocket.send_json(message)
        data = json.loads(websocket.receive_json())
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'instrument'"}}


def test_subscribe_market_data_event_instrument_not_str():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.SUBSCRIBE_MARKET_DATA, 'message': {'instrument': 1}}
        websocket.send_json(message)
        data = json.loads(websocket.receive_json())
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: Неверный тип: 'instrument' должно быть строкой."}}


def test_subscribe_market_data_event_price_not_number():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.SUBSCRIBE_MARKET_DATA, 'message': {'instrument': 1}}
        websocket.send_json(message)
        data = json.loads(websocket.receive_json())
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: Неверный тип: 'instrument' должно быть строкой."}}


def test_subscribe_market_data_event_unknown_instrument():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.SUBSCRIBE_MARKET_DATA, 'message': {'instrument': 'EUR'}}
        websocket.send_json(message)
        data = json.loads(websocket.receive_json())
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Ошибка в формате сообщения: 'Инструмент EUR не поддерживается сервером'"}}


def test_subscribe_market_data_event_is_ok():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': MessageType.SUBSCRIBE_MARKET_DATA, 'message': {'instrument': 'EUR/USD'}}
        websocket.send_json(message)
        success_data = json.loads(websocket.receive_json())
        data = json.loads(websocket.receive_json())
        assert (success_data == {'messageType': MessageType.SUCCESS_INFO, 'message': {'subscriptionId': 'EUR/USD'}}
                and data == {'messageType': 8,
                             'message': {'ask_price': 1.0, 'bid_price': 1.0, 'instrument_id': 'EUR/USD'}})
