export function SubscribeMarketData(instrument_id) {
    return JSON.stringify({
        "messageType": 1,
        "message": {"instrument": instrument_id}
    })
}

export function UnsubscribeMarketData(instrument_id) {
    return JSON.stringify({
        "messageType": 2,
        "message": {"instrument": instrument_id}
    })
}