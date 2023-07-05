import React, {useCallback, useEffect, useRef} from "react";
import './style/normalize.css';
import './style/App.css';
import Ticker from "./components/Ticker";
import { useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import {SubscribeMarketData, UnsubscribeMarketData} from "./api/api";
import ReconnectingWebSocket from 'reconnecting-websocket';


function App() {
    const ws = useRef(null);
    const [message, setMessage] = useState(null);
    const [instrument, setInstrument] = useState('EUR/USD');
    const [isConnection, setIsConnection] = useState(false);

    const override = {
        display: 'block',
        margin: '50% auto 0',
    };

    useEffect(() => {
        if (!isConnection) {
            ws.current = new ReconnectingWebSocket('ws://localhost:8000/ws/');

            ws.current.onopen = () => {
                console.log('Соединение открыто')
                setIsConnection(true)

                setTimeout(() => {
                    ws.current.send(SubscribeMarketData(instrument))
                }, 1000)
            };
            ws.current.onclose = () => {
                console.log('Соединение закрыто')
                setIsConnection(false)
            };

            gettingData();
        }
    }, [ws]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = event => {
            if (isConnection) return;

            const message = JSON.parse(event.data)
            setMessage(message);
            console.log(message)
        };
    }, [isConnection]);

    function onSelectChange(value) {
        setMessage(null)
        ws.current.send(UnsubscribeMarketData(instrument))
        ws.current.send(SubscribeMarketData(value))
        setInstrument(value)
    }

    return (
        <div className='App'>
            {!isConnection ?
                <BarLoader
                    loading={true}
                    cssOverride={override}
                    height={7}
                    width={600}
                    color={'#36d7b7'}
                    speedMultiplier={0.8}
                />
            :
                <Ticker
                    socket={ws.current}
                    message={message}
                    onSelectChange={onSelectChange}
                />
            }
        </div>
    );
}

export default App;
