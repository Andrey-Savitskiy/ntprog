import React from 'react';
import SubmitButton from './UI/button/SubmitButton';
import '../style/components/TickerCost.css'

const TickerCost = (props) => {
    return (
        <div className={'TickerCost-container'}>
            <p className={'TickerCost-paragraph'}>{props.content.cost}</p>
            <SubmitButton
                value={props.content.buttonText}
                className={props.className}
            />
        </div>
    );
};

export default TickerCost;