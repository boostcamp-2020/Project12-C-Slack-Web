import './App.css'
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io('http://localhost:4000/chat', { query: { username: 't1' } })

function App() {
  // const [socket, setSocket] = useState(null)
  const [msg, setMsg] = useState('')
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('new message', data => {
      console.log(data)
    })
    console.log(socket)
    // setSocket(connect('testuser1'))
    console.log(socket)
    socket.emit('add user', 'username')
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('new message')
    }
    // console.log(connect('testuser1'))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="textarea"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        ></input>
        <button
          onClick={() => {
            socket.emit('new message', { message: msg })
          }}
        >
          ggg
        </button>
      </header>
    </div>
  )
}

export default App
