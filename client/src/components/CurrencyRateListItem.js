import React from 'react';

const CurrencyRateListItem = (props) => {
    return (
        <li className={'currency-rate-list-item'}>
            <p>{props.content.name}: <strong>{props.content.cost}</strong></p>
        </li>
    );
};

export default CurrencyRateListItem;