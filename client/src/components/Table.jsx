import React, {useEffect, useMemo, useState} from 'react';
import '../style/components/Table.css'
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import {parsing_table} from "../api/parsing";

const Table = (props) => {
    const [ordersList, setOrdersList] = useState([])

    function changeTable() {
        parsing_table(props.message, ordersList, setOrdersList)
    }

    const memoizedList = useMemo(() => {
        return ordersList.sort((a, b) => new Date(a['creation_time']) - new Date(b['creation_time']));
    }, [ordersList]);

    useEffect(() => {
        changeTable()
    }, [props.message])

    return (
        <div className="table-container">
            <TableHead/>
            {memoizedList.length ?
                memoizedList.map((order, index) =>
                    <TableRow
                        key={order['ID']}
                        order={order}
                        index={memoizedList.length - index}
                        onCancelButtonClick={props.onCancelButtonClick}
                    />
                )
            :
                <p className={'table-paragraph'}>Список заявок пуст</p>
            }
        </div>
    );
};

export default Table;