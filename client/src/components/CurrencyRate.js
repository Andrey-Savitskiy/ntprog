import React, {useState} from 'react';
import '../style/components/CurrencyRate.css';
import CurrencyRateListItem from "./CurrencyRateListItem";
import CurrencyRateList from "./CurrencyRateList";

const CurrencyRate = () => {
    const [contentSell, setCurrencyRateSell] = useState([
        {id: 1, name: 'EUR/USD', cost: 1.089900},
        {id: 2, name: 'EUR/RUB', cost: 92.3400},
        {id: 3, name: 'USD/RUB', cost: 84.7000},
    ])

    const [contentBuy, setCurrencyRateBuy] = useState([
        {id: 1, name: 'EUR/USD', cost: 1.09109},
        {id: 2, name: 'EUR/RUB', cost: 93.3460},
        {id: 3, name: 'USD/RUB', cost: 86.5670},
    ])

    return (
        <article className={'currency-rate'}>
            <h3 className={'currency-rate-header'}>Курсы валютных пар:</h3>

            <div className={'currency-rate-container'}>
                <CurrencyRateList
                    idPrefix={'sell'}
                    content={{header: 'Продажа', content: contentSell}}
                    style={{color: 'red'}}
                />
                <CurrencyRateList
                    idPrefix={'buy'}
                    content={{header: 'Купля', content: contentBuy}}
                    style={{color: 'green'}}
                />
            </div>
        </article>
    );
};

export default CurrencyRate;
