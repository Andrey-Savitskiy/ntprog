import React, {useCallback, useEffect, useRef} from "react";
import './style/normalize.css';
import './style/App.css';
import Ticker from "./components/Ticker";
import Table from "./components/Table";
import {useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import WebsocketConnection from "./utils/websocket_connection";
import GettingData from "./utils/getting_data";
import OnSelectChangeEvent from "./utils/on_select_change_event";
import OnOrderButtonClickEvent from "./utils/on_order_button_click_event";
import {CancelOrder} from "./api/api";


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

    const gettingData = useCallback(() => {
        GettingData(ws, isConnection, setMessage)
    }, [isConnection]);

    useEffect(() => {
        WebsocketConnection(ws, isConnection, setIsConnection, instrument, setMessage, gettingData);
    }, [ws]);

    function onSelectChange(value) {
        OnSelectChangeEvent(value, ws, setMessage, setInstrument, instrument)
    }

    function onOrderButtonClick(event) {
        OnOrderButtonClickEvent(event, ws, bidPrice, askPrice)
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
