import React, { useState, useEffect } from "react";
import SockJsClient from 'react-stomp';
const ENDPOINT = "http://127.0.0.1:8081";

function App() {
  const [response, setResponse] = useState("");
  const [inp, setInp] = useState(null)
  const [listNoti, setListNoti] = useState(null)
  const [curSocket, setCurSocket] = useState(null)
  const [listNotiDiv, setListNotiDiv] = useState([])
  const [clientRef, setClientRef] = useState([])
  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <input type="text" ref={(inp => {setInp(inp)})}/>
      <div>
        <SockJsClient url='http://localhost:8080/notify-websocket' topics={['/notify/greetings']}
            onMessage={(msg) => { console.log(msg); }}
            ref={ (client) => { setClientRef(client) }} />
      </div>
      <div ref = {div => setListNoti(div)}>
        {listNotiDiv.map((div,index) => (
          <p key = {index}>{div}</p>
        ))}
      </div>
    </div>
  );
}

export default App;