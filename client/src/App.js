import React, {useCallback, useEffect, useRef} from "react";
import './style/normalize.css';
import './style/App.css';
import Ticker from "./components/Ticker";
import { useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import parserApi from "./api/parser_api";
import SubscribeMarketData from "./api/api";
import ReconnectingWebSocket from 'reconnecting-websocket';


function App() {
    const ws = useRef(null);
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
                    ws.current.send(SubscribeMarketData('EUR/USD'))
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

            const message = JSON.parse(event.data);
            console.log(message)
            parserApi(message);
        };
    }, [isConnection]);

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
                <Ticker socket={ws.current}/>
            }
        </div>
    );
}

export default App;
