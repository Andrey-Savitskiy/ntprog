from fastapi import FastAPI, WebSocket


app = FastAPI()


@app.websocket("/ws/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            message = await websocket.receive_json()
            print(message)
        except Exception as error:
            continue


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
