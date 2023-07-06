import {API} from "./api";

function setCost(bid_price, ask_price, setSell, setBuy) {
    const input = document.getElementsByTagName('input')[0].value;
    const inputNumber = input ? parseFloat(input) : 1;

    setSell((bid_price * inputNumber).toFixed(2));
    setBuy((ask_price * inputNumber).toFixed(2))
}

export const parsing_ticket = (message,
                               setIsDataLoaded,
                               setSell, setBuy,
                               setBidPrice,
                               setAskPrice,
                               bidPrice,
                               askPrice) => {
    if (message) {
        switch (message.messageType) {
            case API.SUCCESS_INFO:
                setIsDataLoaded(false)
                break
            case API.ERROR_INFO:
                alert(`Произошла ошибка на сервере: ${message.message['reason']}`)
                break
            case API.EXECUTION_REPORT:
                setCost(bidPrice, askPrice, setSell, setBuy);
                break
            case API.UPDATE_MARKET_DATA:
                const {ask_price, bid_price} = {...message.message}
                setBidPrice(bid_price)
                setAskPrice(ask_price)

                setCost(bid_price, ask_price, setSell, setBuy);

                setIsDataLoaded(true)
                break
        }
    } else {
        setIsDataLoaded(false)
    }
}

export const parsing_table = (message, ordersList, setOrdersList) => {
    if (message) {
        switch (message.messageType) {
            case API.EXECUTION_REPORT:
                setOrdersList([...ordersList, message.message])
                break
        }
    }
}