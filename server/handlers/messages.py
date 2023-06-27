from server.api.api import MarketDataUpdate
from server.settings import subscribers, quotes


async def send_message(clients: list, message: dict):
    for client in clients:
        await client.send_text(message)


async def send_market_data_update_message():
    for client, instrument_id in subscribers.items():
        ask_price = quotes[instrument_id]['sell']
        bid_price = quotes[instrument_id]['buy']
        await client.send_text(MarketDataUpdate(instrument_id=instrument_id,
                                                ask_price=ask_price,
                                                bid_price=bid_price).to_json())
