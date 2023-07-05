import React, {useEffect, useState} from 'react';
import '../style/components/Ticker.css'
import Select from "./UI/input/Select";
import Input from "./UI/input/Input";
import TickerCost from "./TickerCost";
import {PulseLoader} from "react-spinners";
import {parsing} from "../api/parsing";


const Ticker = (props) => {
    const [sell, setSell] = useState('0')
    const [buy, setBuy] = useState('0')
    const [isDataLoaded, setIsDataLoaded] = useState(true)

    function changeTicker() {
        parsing(props.message, setIsDataLoaded, setSell, setBuy)
    }

    useEffect(() => {
        changeTicker()
    }, [props.message])

    return (
        <form className={'ticker-form'}>
            <Select
                className={{select: 'ticker-form-select', option: 'ticker-form-option'}}
                onChange={props.onSelectChange}
                setNullMessage={props.setNullMessage}
                socket={props.socket}
            />

            <Input
                className={'ticker-form-input'}
                onChange={changeTicker}
            />

            {isDataLoaded ?
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
            :
                <PulseLoader
                    loading={true}
                    margin={20}
                    color={'#000'}
                />
            }
        </form>
    );
};

export default Ticker;