from starlette.websockets import WebSocket
from server.api.api import *
from server.handlers.messages import send_message
from server.settings import subscribers, quotes


async def parser_api(message: dict, websocket: WebSocket) -> None:
    try:
        print(message)
        message_type = message['messageType']
        message_body = message['message']

        if message_type == MessageType.SUBSCRIBE_MARKET_DATA:
            instrument_id = message_body['instrument']
            subscribers[websocket] = instrument_id
            await send_message(clients=[websocket], message=SuccessInfo(subscription_id=instrument_id).to_json())

            ask_price = quotes[instrument_id]['sell']
            bid_price = quotes[instrument_id]['buy']
            await websocket.send_text(MarketDataUpdate(instrument_id=instrument_id,
                                                       ask_price=ask_price,
                                                       bid_price=bid_price).to_json())

    except Exception as error:
        await send_message(clients=[websocket], message=ErrorInfo(reason=str(error)).to_json())
