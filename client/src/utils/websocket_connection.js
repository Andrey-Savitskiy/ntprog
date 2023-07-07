import ReconnectingWebSocket from "reconnecting-websocket";
import {SubscribeMarketData} from "../api/api";
import React from 'react';

function WebsocketConnection(ws, isConnection, setIsConnection, instrument, setMessage, gettingData) {
    if (!isConnection) {
        ws.current = new ReconnectingWebSocket('ws://localhost:8000/ws/');

        ws.current.onopen = () => {
            setIsConnection(true)

            setTimeout(() => {
                ws.current.send(SubscribeMarketData(instrument))
            }, 1000)
        };
        ws.current.onclose = () => {
            setIsConnection(false)
        };

        gettingData(ws, isConnection, setMessage);
    }
}

export default WebsocketConnection;