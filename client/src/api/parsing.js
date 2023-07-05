export const parsing = (message, setIsDataLoaded, setSell, setBuy) => {
    if (message) {
        switch (message.messageType) {
            case 5:
                setIsDataLoaded(false)
                break
            case 8:
                const input = document.getElementsByTagName('input')[0].value;
                const inputNumber = input ? parseFloat(input) : 1;
                const {ask_price, bid_price} = {...message.message}

                setSell((bid_price * inputNumber).toFixed(2));
                setBuy((ask_price * inputNumber).toFixed(2))
                setIsDataLoaded(true)
                break
        }
    } else {
        setIsDataLoaded(false)
    }
}