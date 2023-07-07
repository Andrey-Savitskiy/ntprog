import SubscribeMarketData from './api'
import parserApi from "./parser_api";

export const websocketConnection = () => {
    const socket = new WebSocket("ws://localhost:8000/ws/");

    socket.onopen = function () {
        console.log("WebSocket is open");
        socket.send(SubscribeMarketData(1))
    };

    socket.onmessage = function (event) {
        console.log(event.data);
        parserApi(JSON.parse(event.data));
    };

    socket.onclose = function () {
        console.log("WebSocket is closed");
    };
}

export default websocketConnection;
