import React from 'react';


const Input = (props) => {
    function change(event) {
        event.target.value = event.target.value ? event.target.value : 1;
        props.onChange();
    }

    return (
        <input className={'ticker-form-input'}
               type='number'
               min={1}
               defaultValue={1}
               name={'amount'}
               onChange={event => change(event)}
        />
    );
};

export default Input;