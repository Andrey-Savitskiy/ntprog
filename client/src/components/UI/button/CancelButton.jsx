import React from 'react';
import '../../../style/components/UI/button/CancelButton.css'

const CancelButton = (props) => {
    return (
        <button
            type='button'
            id={props.id}
            className={`${props.className} CancelButton`}
            onClick={props.onClick}
        ></button>
    );
};

export default CancelButton;