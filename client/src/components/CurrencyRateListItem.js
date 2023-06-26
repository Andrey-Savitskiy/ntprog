import React from 'react';

const CurrencyRateListItem = (props) => {
    return (
        <li className={'currency-rate-list-item'}>
            <p id={`${props.content.name}-${props.idPrefix}`}>{props.content.name}: <strong>{props.content.cost}</strong></p>
        </li>
    );
};

export default CurrencyRateListItem;