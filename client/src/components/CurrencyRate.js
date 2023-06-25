import React, {useState} from 'react';
import '../style/components/CurrencyRate.css';
import CurrencyRateListItem from "./CurrencyRateListItem";

const CurrencyRate = () => {
    const [content, setCurrencyRate] = useState([
        {id: 1, name: 'EUR/USD', cost: 1.089900},
        {id: 2, name: 'EUR/RUB', cost: 92.3400},
        {id: 3, name: 'USD/RUB', cost: 84.7000},
    ])

    return (
        <article className={'currency-rate'}>
            <h3 className={'currency-rate-header'}>Курсы валютных пар:</h3>
            <ul className={'currency-rate-list'}>
                {content.map(item => <CurrencyRateListItem content={item} key={item.id}/>)}
            </ul>
        </article>
    );
};

export default CurrencyRate;
