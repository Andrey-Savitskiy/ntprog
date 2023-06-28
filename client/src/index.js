import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";

const reducer = (state, action) => {
    switch (action.type) {
        case 'setPrice':
            return {...state, cost: (action.payload['price'] * action.payload['inputNumber']).toFixed(2)}
        // case 'setBuy':
        //     return {...state, cost: (action.payload * state.cost).toFixed(2)}
        default:
            return state
    }
}
const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
