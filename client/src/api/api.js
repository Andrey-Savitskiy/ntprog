export const API = {
    SUBSCRIBE_MARKET_DATA: 1,
    UNSUBSCRIBE_MARKET_DATA: 2,
    PLACE_ORDER: 3,
    CANCEL_ORDER: 4,
    SUCCESS_INFO: 5,
    ERROR_INFO: 6,
    EXECUTION_REPORT: 7,
    UPDATE_MARKET_DATA: 8,
}

export function SubscribeMarketData(instrument_id) {
    return JSON.stringify({
        "messageType": API.SUBSCRIBE_MARKET_DATA,
        "message": {"instrument": instrument_id}
    })
}

export function UnsubscribeMarketData(instrument_id) {
    return JSON.stringify({
        "messageType": API.UNSUBSCRIBE_MARKET_DATA,
        "message": {"instrument": instrument_id}
    })
}

export function PlaceOrder(instrument_id, side, price, amount) {
    return JSON.stringify({
        "messageType": API.PLACE_ORDER,
        "message": {
            "instrument": instrument_id,
            "side": side,
            "price": price,
            "amount": amount,
        }
    })
}