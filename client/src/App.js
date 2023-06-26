import React from "react";
import './style/normalize.css';
import './style/App.css';
import CurrencyRate from "./components/CurrencyRate";
import Ticker from "./components/Ticker";

function App() {
    return (
        <div className='App'>
            <CurrencyRate/>
            <Ticker/>
        </div>
    );
}

export default App;
