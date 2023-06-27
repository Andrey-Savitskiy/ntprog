import asyncio
import random
from server.settings import logger, CURRENCY

quotes = {
    'EUR/USD': {'buy': 1, 'sell': 1},
    'EUR/RUB': {'buy': 92.5, 'sell': 92.3},
    'USD/RUB': {'buy': 84.7, 'sell': 84.66},
}


@logger.catch()
async def get_quotes():
    while True:
        print(quotes)
        await asyncio.sleep(random.randrange(10, 15))
        for currency in CURRENCY:
            for key, value in quotes[currency].items():
                quotes[currency][key] = round(abs(value + random.uniform(-1, 1)), 3)
