import json
from starlette.testclient import TestClient

from server.app import app
from server.api.api import MessageType


def test_unknown_order_event():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'messageType': -1, 'message': {}}
        websocket.send_json(message)
        data = json.loads(websocket.receive_json())
        assert data == {'messageType': MessageType.ERROR_INFO,
                        'message': {'reason': "Сообщение неизвестного типа"}}
