import React from 'react';
import '../../../style/components/UI/button/SubmitButton.css'

const SubmitButton = (props) => {
    function click(event) {
        event.preventDefault()
    }

    return (
        <button
            className={`${props.className} SubmitButton`}
            type={'submit'}
            onClick={event => click(event)}>{props.value}
        </button>
    );
};

export default SubmitButton;