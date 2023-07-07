import asyncio
import random
from datetime import datetime
from server.api.api import ExecutionReport
from server.settings import logger, subscribers_object

NEW_STATUS = ['Filled', 'Rejected']


# Есть баг в работе функции не получается получить актуальное значение subscribers,
# но в реальном проекте это будет бд и проблемы такой не будет, посчитал этот баг не критичным.
@logger.catch()
async def set_status():
    while True:
        try:
            await asyncio.sleep(random.randrange(5, 7))
            subscribers = subscribers_object.subscribers

            for websocket, websocket_body in subscribers.items():
                for order_id, order_body in websocket_body['orders_dict'].items():
                    if order_body['status'] == 'Active' and random.choice([True, False]):
                        order_body['status'] = random.choice(NEW_STATUS)
                        now_time = datetime.now()
                        order_body['change_time'] = now_time.strftime("%Y-%m-%d %H:%M:%S:%f")

                        await websocket.send_text(ExecutionReport(order_body).to_json())
                    await asyncio.sleep(1)

        except Exception:
            continue
