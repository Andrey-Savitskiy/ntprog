from fastapi.testclient import TestClient
from starlette.websockets import WebSocketDisconnect

from server.app import app
from server.api.api import MessageType



def test_websocket_on_receive_json():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = {'msg': 'Hello WebSocket'}
        websocket.send_json(message)
        data = websocket.receive_json()
        assert data == {'messageType': MessageType.ERROR_INFO, 'message': {'reason': "Ошибка в формате сообщения: 'messageType'"}}


def test_websocket_on_receive_not_json():
    client = TestClient(app)
    with client.websocket_connect('/ws/') as websocket:
        message = 'Hello WebSocket'
        websocket.send_text(message)
        try:
            websocket.receive_json()
            assert False
        except WebSocketDisconnect:
            assert True
