import MarketDataUpdate from "./handlers/MarketDataUpdate";

const [
        SUBSCRIBE_MARKET_DATA,
        UNSUBSCRIBE_MARKET_DATA,
        PLACE_ORDER,
        CANCEL_ORDER,
        SUCCESS_INFO,
        ERROR_INFO,
        EXECUTION_REPORT,
        UPDATE_MARKET_DATA] = [1, 2, 3, 4, 5, 6, 7, 8]

export const parserApi = (message) => {
    switch (message['messageType']) {
        case SUBSCRIBE_MARKET_DATA:
            break
        case UNSUBSCRIBE_MARKET_DATA:
            break
        case PLACE_ORDER:
            break
        case CANCEL_ORDER:
            break
        case SUCCESS_INFO:
            break
        case ERROR_INFO:
            break
        case EXECUTION_REPORT:
            break
        case UPDATE_MARKET_DATA:
            MarketDataUpdate(message['message'])
            break
    }
}

export default parserApi;