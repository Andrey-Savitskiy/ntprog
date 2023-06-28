function SubscribeMarketData(instrument_id) {
    return JSON.stringify({
        "messageType": 1,
        "message": {"instrument": instrument_id}
    })
}

export default SubscribeMarketData;
