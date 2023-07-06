from loguru import logger


logger.add('logs/debug.log', level="WARNING", rotation="50 MB", compression='zip',
           enqueue=True, backtrace=True, diagnose=True)

quotes = {
    'EUR/USD': {'buy': 1., 'sell': 1.},
    'EUR/RUB': {'buy': 92.5, 'sell': 92.3},
    'USD/RUB': {'buy': 84.7, 'sell': 84.66},
}

"""
subscribers = {
    websocket: {
        'instrument': '',
        'orders_dict': []
    }
}
"""
subscribers = {}
