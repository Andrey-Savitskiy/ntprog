import React, {useEffect, useState} from 'react';
import '../style/components/Ticker.css'
import Select from "./UI/input/Select";
import Input from "./UI/input/Input";
import TickerCost from "./TickerCost";
import {PulseLoader} from "react-spinners";
import {parsing_ticket} from "../api/parsing";


const Ticker = (props) => {
    const [sell, setSell] = useState('0')
    const [buy, setBuy] = useState('0')
    const [isDataLoaded, setIsDataLoaded] = useState(true)

    const override = {
        marginTop: '10%'
    };

    function changeTicker() {
        parsing_ticket(props.message,
            setIsDataLoaded,
            setSell,
            setBuy,
            props.setBidPrice,
            props.setAskPrice,
            props.bidPrice,
            props.askPrice
        )
    }

    useEffect(() => {
        changeTicker()
    }, [props.message])

    return (
        <form id={'form'} className={'ticker-form'}>
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
                        onOrderButtonClick={props.onOrderButtonClick}
                    />
                    <div className={'vertical-line'}></div>
                    <TickerCost
                        content={{cost: buy, buttonText: 'BUY'}}
                        className={'ticker-form-button buy'}
                        onOrderButtonClick={props.onOrderButtonClick}
                    />
                </div>
            :
                <PulseLoader
                    loading={true}
                    margin={20}
                    color={'#000'}
                    cssOverride={override}
                />
            }
        </form>
    );
};

export default Ticker;