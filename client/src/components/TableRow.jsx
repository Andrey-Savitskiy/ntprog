import React, {useEffect, useState} from 'react';
import CancelButton from "./UI/button/CancelButton";

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
        <div
            className='table-body'
            id={ID}
        >
            <div className='table-body-box'>{props.index}</div>
            <div className='table-body-box'>{creation_time}</div>

            <div
                className='table-body-box'
                id={`change_time:${ID}`}
            >{change_time}</div>

            <div
                className='table-body-box'
                id={`status:${ID}`}
            >{status}</div>

            <div className={`${color} table-body-box`}>{side}</div>
            <div className={`${color} table-body-box`}>{price}</div>
            <div className={`${color} table-body-box`}>{amount}</div>
            <div className='table-body-box'>{instrument}</div>

            <CancelButton
                className={'table-body-box'}
                id={`cancel:${ID}`}
                onClick={props.onCancelButtonClick}
            />
        </div>
    );
};

export default TableRow;