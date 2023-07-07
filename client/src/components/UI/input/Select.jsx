import React, {useState} from 'react';


const Select = (props) => {
    const [option, setOption] = useState([
        {id: 'EUR/USD'},
        {id: 'EUR/RUB'},
        {id: 'USD/RUB'},
    ])

    return (
        <select
            className={props.className.select}
            onChange={event => props.onChange(event.target.value)}
            name={'instrument'}
        >
            {option.map(item => (
                <option
                    className={props.className.option}
                    name={item.id}
                    value={item.id}
                    key={item.id}>
                    {item.id}
                </option>
            ))}
        </select>
    );
};

export default Select;