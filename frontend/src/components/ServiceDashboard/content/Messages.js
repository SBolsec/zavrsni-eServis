import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Messages = () => {
  const [text, setText] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('chat message', text);
    setText('');
  }

  return (
    <div>
      <ul id="messages">

      </ul>
      <form id="form">
        <input id="input" autocomplete="off" value={text} onChange={(e => setText(e.target.value))} />
        <button onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
}
 
export default Messages;