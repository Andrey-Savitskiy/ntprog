import React from 'react';
import CurrencyRateListItem from "./CurrencyRateListItem";

const CurrencyRateList = (props) => {
    const [header, content] = [props.content.header, props.content.content]
    return (
        <div>
            <h4
                className={'currency-rate-list-header'}
                style={props.style}
            >{header}</h4>
            <ul className={'currency-rate-list'}>
                {content.map(item => <CurrencyRateListItem idPrefix={props.idPrefix} content={item} key={item.id}/>)}
            </ul>
        </div>
    );
};

export default CurrencyRateList;