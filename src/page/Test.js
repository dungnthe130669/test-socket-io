import React, { useState, useEffect } from 'react';
import io from "socket.io-client"
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:12222/echo';

const socket = io(SOCKET_URL, {transports : ["websocket"]})
const Test = () => {
    const [message, setMessage] = useState('You server message here.');

  useEffect(() => {
    // socket.on("connect", () => {
    //     console.log("connect")
    // });
    // socket.on("message", message => {
    //     console.log(message)
    // });
    // socket.on("connected", () =>{
    //     console.log("connected") 
    // });
    // socket.on("disconnected", () => {
    //     console.log("disconnected")
    // });
    // setInterval(() => {
    //     sendMessage("Hello")
    // }, 2000)
  }, [])
  let onConnected = () => {
    console.log("Connected!!") 
  }

  let onMessageReceived = (msg) => {
    setMessage(msg);
    console.log(msg)
  }
  let sendMessage = (msg) => {
    clientRef.sendMessage('/', msg);
  }
  var clientRef;

  return (
    <div>
      <div>
        <SockJsClient url={SOCKET_URL} topics={['/']}
            
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { clientRef = client }}
            onMessageReceived={(msg) => console.log(msg)} 
            onDisconnect = {console.log("disconnect")}
        />
      </div>
      <div>{message}</div>  
      <div>Hello world</div>
    </div>
  );
}

export default Test