import React from 'react';

const TableHead = () => {
    const namesColumnList = [
        'ID',
        'Creation time',
        'Change time',
        'Status',
        'Side',
        'Price',
        'Amount',
        'Instrument'
    ]

    return (
        <div className="table-head">
            {namesColumnList.map(name => <div className="table-head-box" key={name}>{name}</div>)}
        </div>
    );
};

export default TableHead;