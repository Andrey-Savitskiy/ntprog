import {setSellContext, setBuyContext} from "../../components/Ticker";
import {useDispatch, useSelector} from "react-redux";

const MarketDataUpdate = (message) => {
    const input = document.getElementsByTagName('input')[0].value;
    const inputNumber = input ? parseFloat(input) : 1;



    // setSell((message['bid_price'] * inputNumber).toFixed(2));
    // setBuy((message['ask_price'] * inputNumber).toFixed(2))
};

export default MarketDataUpdate;