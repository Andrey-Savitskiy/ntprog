import React from 'react';
import '../style/components/Ticker.css'
import Select from "./UI/input/Select";
import Input from "./UI/input/Input";
import TickerCost from "./TickerCost";

const Ticker = () => {
    return (
        <form className={'ticker-form'}>
            <Select className={{select: 'ticker-form-select', option: 'ticker-form-option'}}/>

            <Input className={'ticker-form-input'}/>

            <div className={'ticker-cost'}>
                <TickerCost
                    content={{cost: 8.998, buttonText: 'SELL'}}
                    className={'ticker-form-button sell'}
                />
                <div className={'vertical-line'}></div>
                <TickerCost
                    content={{cost: 9.134, buttonText: 'BUY'}}
                    className={'ticker-form-button buy'}
                />
            </div>
        </form>
    );
};

export default Ticker;
