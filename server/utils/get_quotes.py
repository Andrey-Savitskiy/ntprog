import asyncio
import random
from server.handlers.messages import send_market_data_update_message
from server.settings import logger, CURRENCY, quotes


@logger.catch()
async def get_quotes():
    while True:
        print(quotes)
        await asyncio.sleep(random.randrange(10, 15))
        for currency in CURRENCY.keys():
            for key, value in quotes[currency].items():
                quotes[currency][key] = round(abs(value + random.uniform(-1, 1)), 3)

        await send_market_data_update_message()
