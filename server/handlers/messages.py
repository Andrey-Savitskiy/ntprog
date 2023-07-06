from server.api.api import MarketDataUpdate
from server.settings import subscribers, quotes


async def send_message(clients: list, message: dict):
    for client in clients:
        try:
            await client.send_text(message)
        except RuntimeError:
            continue


async def send_market_data_update_message():
    for client in subscribers:
        instrument_id = subscribers[client]['instrument']
        ask_price = quotes[instrument_id]['sell']
        bid_price = quotes[instrument_id]['buy']
        try:
            await client.send_text(MarketDataUpdate(instrument_id=instrument_id,
                                                    ask_price=ask_price,
                                                    bid_price=bid_price).to_json())
        except RuntimeError:
            continue
