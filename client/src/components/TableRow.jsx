import React from 'react';

const TableRow = (props) => {
    const {
        ID,
        creation_time,
        change_time,
        status,
        side,
        price,
        amount,
        instrument
    } = {...props.order}

    const color = (side === 'BUY') ? 'green' : 'red';

    return (
        <div className='table-body'>
            <div className='table-body-box'>{ID}</div>
            <div className='table-body-box'>{creation_time}</div>
            <div className='table-body-box'>{change_time}</div>
            <div className='table-body-box'>{status}</div>
            <div className={`${color} table-body-box`}>{side}</div>
            <div className={`${color} table-body-box`}>{price}</div>
            <div className={`${color} table-body-box`}>{amount}</div>
            <div className='table-body-box'>{instrument}</div>
        </div>
    );
};

export default TableRow;