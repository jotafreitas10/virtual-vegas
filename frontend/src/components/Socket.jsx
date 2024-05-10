import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000'; // Atualize com o endpoint do seu servidor

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    return () => newSocket.close(); // Fecha o socket ao desmontar o componente
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listener para mensagens recebidas do servidor
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Limpeza do listener ao desmontar o componente
    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !socket) return;

    // Envia a mensagem para o servidor
    socket.emit('chatMessage', messageInput);
    setMessageInput('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatApp;