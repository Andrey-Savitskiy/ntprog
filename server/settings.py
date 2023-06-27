from loguru import logger


logger.add('logs/debug.log', level="WARNING", rotation="50 MB", compression='zip',
           enqueue=True, backtrace=True, diagnose=True)

CURRENCY = {
    1: 'EUR/USD',
    2: 'EUR/RUB',
    3: 'USD/RUB',
}

quotes = {
    1: {'buy': 1., 'sell': 1.},
    2: {'buy': 92.5, 'sell': 92.3},
    3: {'buy': 84.7, 'sell': 84.66},
}

subscribers = {}
