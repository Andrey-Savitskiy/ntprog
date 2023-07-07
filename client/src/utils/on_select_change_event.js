import {SubscribeMarketData, UnsubscribeMarketData} from "../api/api";

import React from 'react';

const OnSelectChangeEvent = (value, ws, setMessage, setInstrument, instrument) => {
    setMessage(null)
    ws.current.send(UnsubscribeMarketData(instrument))
    ws.current.send(SubscribeMarketData(value))
    setInstrument(value)
}

export default OnSelectChangeEvent;
