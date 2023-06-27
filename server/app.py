from fastapi import FastAPI, WebSocket
from settings import logger

app = FastAPI()


@logger.catch()
@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            message = await websocket.receive_json()
            print(message)
        except Exception as error:
            logger.error(str(error), error.__traceback__)
            continue


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
