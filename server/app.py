import asyncio
import uvicorn
from fastapi import FastAPI, WebSocket
from server.utils.get_quotes import get_quotes
from settings import logger
from api.parser_api import parser_api

app = FastAPI()


@logger.catch()
@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        await parser_api(await websocket.receive_json())


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
        ]
        ioloop.run_until_complete(asyncio.wait(tasks))
    except Exception as error:
        logger.error(str(error), error.__traceback__)


if __name__ == "__main__":
    main()
