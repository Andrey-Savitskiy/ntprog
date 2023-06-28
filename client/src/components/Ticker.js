import React, {createContext, useEffect, useState} from 'react';
import '../style/components/Ticker.css'
import Select from "./UI/input/Select";
import Input from "./UI/input/Input";
import TickerCost from "./TickerCost";
import websocketConnection from '../api/connection'
import {useDispatch, useSelector} from "react-redux";

// export function changeTicker(message, setSell, setBuy) {
//     // const currencyPare = document.getElementsByTagName('select')[0].value;
//     //
//     // const currencyCostSell = parseFloat(document.getElementById(currencyPare + '-sell').children[0].textContent);
//     // const currencyCostBuy = parseFloat(document.getElementById(currencyPare + '-buy').children[0].textContent);
//     const input = document.getElementsByTagName('input')[0].value;
//     const inputNumber = input ? parseFloat(input) : 1;
//
//     setSell((message['bid_price'] * inputNumber).toFixed(2));
//     setBuy((message['ask_price'] * inputNumber).toFixed(2))
// }



const Ticker = () => {
    const [sell, setSell] = useState('0')
    const [buy, setBuy] = useState('0')

    const dispatch = useDispatch()
    const bid_price = useSelector(state => setSell)


    useEffect(websocketConnection)

    return (
        <form className={'ticker-form'}>
            <Select
                className={{select: 'ticker-form-select', option: 'ticker-form-option'}}
                // onChange={changeTicker}
            />

            <Input
                className={'ticker-form-input'}
                // onChange={changeTicker}
            />

            <div className={'ticker-cost'}>
                <TickerCost
                    content={{cost: sell, buttonText: 'SELL'}}
                    className={'ticker-form-button sell'}
                />
                <div className={'vertical-line'}></div>
                <TickerCost
                    content={{cost: buy, buttonText: 'BUY'}}
                    className={'ticker-form-button buy'}
                />
            </div>
        </form>
    );
};

export default Ticker;
export let setSellContext;
export let setBuyContext;