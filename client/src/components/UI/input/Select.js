import React, {useState} from 'react';
import SubscribeMarketData from "../../../api/api";


const Select = (props) => {
    const [option, setOption] = useState([
        {id: 'EUR/USD'},
        {id: 'EUR/RUB'},
        {id: 'USD/RUB'},
    ])

    function onChange(value) {
        props.socket.send(SubscribeMarketData(value))
        props.onChange(value)
    }

    return (
        <select
            className={props.className.select}
            onChange={event => onChange(event.target.value)}
        >
            {option.map(item => (
                <option
                    className={props.className.option}
                    value={item.id}
                    key={item.id}>
                    {item.id}
                </option>
            ))}
        </select>
    );
};

export default Select;