from starlette.testclient import TestClient

from server.app import app
from server.api.api import MessageType


def test_websocket_on_receive_without_message():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': 1}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO, 'message': {'reason': "Ошибка в формате сообщения: 'message'"}}


def test_websocket_on_receive_without_message_type():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'message': ''}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO, 'message': {'reason': "Ошибка в формате сообщения: 'messageType'"}}
