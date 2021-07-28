import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  const [inp, setInp] = useState(null)
  const [listNoti, setListNoti] = useState(null)
  const [curSocket, setCurSocket] = useState(null)
  const [listNotiDiv, setListNotiDiv] = useState([])
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setCurSocket(socket)
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.on("noti", data => {
      listNotiDiv.push(data)
    })

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //

  }, []);
  const onClickBtn = (e) => {
    console.log(inp.value)
    curSocket.emit("noti", inp.value)
  }
  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <input type="text" ref={(inp => {setInp(inp)})}/>
      <button type="button" onClick={onClickBtn} >Click me</button>
      <div ref = {div => setListNoti(div)}>
        {listNotiDiv.map((div,index) => (
          <p key = {index}>{div}</p>
        ))}
      </div>
    </div>
  );
}

export default App;