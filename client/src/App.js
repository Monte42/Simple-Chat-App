import './App.css';
import {useState,useEffect} from 'react'
import io from "socket.io-client"

function App() {
  const [socket] = useState(() => io(":8000"))
  const [newMessage, setNewMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])


  useEffect(() => {
    socket.on("message_from_server", data => {
      setAllMessages(previousMessages => [data, ...previousMessages])
    })
  },[])

  const submitHandler = e => {
    e.preventDefault()
    setAllMessages([newMessage,...allMessages])
    socket.emit("message_from_client", newMessage)
    setNewMessage("")
  }


  return (
    <div className="App">
      <h1>Simple Chat App</h1>
      <div style={{border:"1px solid black", width:"50vw", height:"40vh", overflow:"auto", margin:" 0 auto"}}>
        {allMessages &&
          allMessages.map((thisMessage, index) => {
            return (
              <p key={index}>{thisMessage}</p>
            )
          })
        }
      </div>
      <form onSubmit={submitHandler}>
        <input type="text" onChange={e => setNewMessage(e.target.value)} value={newMessage}/>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default App;
