const MarketDataUpdate = (message) => {
    const {ask_price, bid_price} = {...message}
    window.localStorage.setItem(message['instrument_id'],
        JSON.stringify({'ask_price': ask_price, 'bid_price': bid_price}));
};

export default MarketDataUpdate;