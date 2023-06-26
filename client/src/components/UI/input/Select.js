import React, {useState} from 'react';

const Select = (props) => {
    const [option, setOption] = useState([
        {id: 1, name: 'EUR/USD'},
        {id: 2, name: 'EUR/RUB'},
        {id: 3, name: 'USD/RUB'},
    ])

    return (
        <select
            className={props.className.select}
            onChange={event => props.onChange(event.target.value)}
        >
            {option.map(item => (
                <option
                    className={props.className.option}
                    value={item.name}
                    key={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};

export default Select;