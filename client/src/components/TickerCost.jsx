import React from 'react';
import '../style/components/TickerCost.css'
import '../style/components/UI/input/SubmitInput.css'

const TickerCost = (props) => {
    return (
        <div className={'TickerCost-container'}>
            <p className={'TickerCost-paragraph'}>{props.content.cost}</p>
            <input
                className={`${props.className} SubmitInput`}
                type={'submit'}
                value={props.content.buttonText}
                onClick={event => props.onOrderButtonClick(event)}
            />
        </div>
    );
};

export default TickerCost;