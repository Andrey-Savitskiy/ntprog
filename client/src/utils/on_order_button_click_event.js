import React from 'react';
import {PlaceOrder} from "../api/api";

const OnOrderButtonClickEvent = (event, ws, bidPrice, askPrice) => {
    event.preventDefault()

    const side = event.target.value;

    const price = (side === 'SELL') ? bidPrice : askPrice;

    let formData = {};
    const data = new FormData(document.getElementById('form'));
    data.forEach(function(value, key){
        formData[key] = value;
    });

    ws.current.send(PlaceOrder(formData['instrument'], side, price, parseInt(formData['amount'])))
};

export default OnOrderButtonClickEvent;