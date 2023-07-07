import React, {useCallback, useEffect, useRef} from "react";
import './style/normalize.css';
import './style/App.css';
import Ticker from "./components/Ticker";
import Table from "./components/Table";
import {useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import {CancelOrder, PlaceOrder, SubscribeMarketData, UnsubscribeMarketData} from "./api/api";
import ReconnectingWebSocket from 'reconnecting-websocket';


function App() {
    const ws = useRef(null);
    const [message, setMessage] = useState(null);
    const [instrument, setInstrument] = useState('EUR/USD');
    const [bidPrice, setBidPrice] = useState(0);
    const [askPrice, setAskPrice] = useState(0);
    const [isConnection, setIsConnection] = useState(false);

    const override = {
        display: 'block',
        margin: '50% auto 0',
    };

    useEffect(() => {

    }, [instrument]);

    useEffect(() => {
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

            gettingData();
        }
    }, [ws]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = event => {
            if (isConnection) return;

            const message = JSON.parse(event.data)
            setMessage(message);
        };
    }, [isConnection]);

    function onSelectChange(value) {
        setMessage(null)
        ws.current.send(UnsubscribeMarketData(instrument))
        ws.current.send(SubscribeMarketData(value))
        setInstrument(value)
    }

    function onOrderButtonClick(event) {
        event.preventDefault()

        const side = event.target.value;

        const price = (side === 'SELL') ? bidPrice : askPrice;

        let formData = {};
        const data = new FormData(document.getElementById('form'));
        data.forEach(function(value, key){
            formData[key] = value;
        });

        ws.current.send(PlaceOrder(formData['instrument'], side, price, parseInt(formData['amount'])))
    }

    function onCancelButtonClick(event) {
        event.preventDefault()

        ws.current.send(CancelOrder(event.target.id.split(':')[1]))
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
               <>
                   <Ticker
                       socket={ws.current}
                       message={message}
                       setBidPrice={setBidPrice}
                       setAskPrice={setAskPrice}
                       bidPrice={bidPrice}
                       askPrice={askPrice}
                       onSelectChange={onSelectChange}
                       onOrderButtonClick={onOrderButtonClick}
                   />
                   <Table
                       message={message}
                       onCancelButtonClick={onCancelButtonClick}
                   />
               </>
            }
        </div>
    );
}

export default App;
