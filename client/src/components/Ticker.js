import React, {useEffect, useState} from 'react';
import '../style/components/Ticker.css'
import Select from "./UI/input/Select";
import Input from "./UI/input/Input";
import TickerCost from "./TickerCost";


const Ticker = (props) => {
    const [sell, setSell] = useState('0')
    const [buy, setBuy] = useState('0')

    function changeTicker() {
        const input = document.getElementsByTagName('input')[0].value;
        const inputNumber = input ? parseFloat(input) : 1;

        const select = document.getElementsByTagName('select')[0].value;

        const price = JSON.parse(window.localStorage.getItem(select))
        console.log(price)

        setSell((price['bid_price'] * inputNumber).toFixed(2));
        setBuy((price['ask_price'] * inputNumber).toFixed(2))
    }

    useEffect(() => {
        changeTicker()
    }, [])

    return (
        <form className={'ticker-form'}>
            <Select
                className={{select: 'ticker-form-select', option: 'ticker-form-option'}}
                onChange={changeTicker}
                socket={props.socket}
            />

            <Input
                className={'ticker-form-input'}
                onChange={changeTicker}
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