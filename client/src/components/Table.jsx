import React, {useEffect, useState} from 'react';
import '../style/components/Table.css'
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import {parsing_table} from "../api/parsing";

const Table = (props) => {
    const [ordersList, setOrdersList] = useState([])

    function changeTable() {
        parsing_table(props.message, ordersList, setOrdersList)
    }

    useEffect(() => {
        changeTable()
    }, [props.message])

    return (
        <div className="table-container">
            <TableHead/>
            {ordersList.length ?
                ordersList.reverse().map((order) => <TableRow key={order['ID']} order={order}/>)
            :
                <p className={'table-paragraph'}>Список заявок пуст</p>
            }
        </div>
    );
};

export default Table;