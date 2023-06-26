import React, {useState} from 'react';


const Input = () => {
    return (
        <input className={'ticker-form-input'}
               type="number"
               min={1}
               defaultValue={1}
        />
    );
};

export default Input;