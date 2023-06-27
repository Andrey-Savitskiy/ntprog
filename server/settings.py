from loguru import logger


logger.add('logs/debug.log', level="WARNING", rotation="50 MB", compression='zip',
           enqueue=True, backtrace=True, diagnose=True)

CURRENCY = ['EUR/USD', 'EUR/RUB', 'USD/RUB']
