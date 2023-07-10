import asyncio
from json import JSONDecodeError

import uvicorn
from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect
from server.utils.get_quotes import get_quotes
from server.utils.set_status import set_status
from settings import logger, subscribers_object
from api.parser_api import parser_api

app = FastAPI()


@logger.catch()
@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    try:
        await websocket.accept()
        subscribers_object.set_subscribers(websocket)
        while True:
            try:
                message = await websocket.receive_json()
                await parser_api(message=message, websocket=websocket)
            except (WebSocketDisconnect, JSONDecodeError):
                subscribers_object.pop_subscribers(websocket)
                await websocket.close()
                continue

    except RuntimeError:
        pass


async def start_server():
    try:
        config = uvicorn.Config(app=app, port=8000)
        server = uvicorn.Server(config)
        await server.serve()
    except Exception as error:
        logger.error(str(error), error.__traceback__)


def main():
    try:
        ioloop = asyncio.get_event_loop()
        tasks = [
            ioloop.create_task(start_server()),
            ioloop.create_task(get_quotes()),
            ioloop.create_task(set_status()),
        ]
        ioloop.run_until_complete(asyncio.wait(tasks))
    except Exception as error:
        logger.error(str(error), error.__traceback__)
        main()


if __name__ == "__main__":
    main()
