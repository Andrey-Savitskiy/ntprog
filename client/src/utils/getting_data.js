import React from 'react';

function GettingData(ws, isConnection, setMessage) {
    if (!ws.current) return;

    ws.current.onmessage = event => {
        if (isConnection) return;

        const message = JSON.parse(event.data)
        setMessage(message);
    };
}

export default GettingData;