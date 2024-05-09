import React, { useState, useEffect } from 'react';
import axios from 'axios';
import botImage from "../assets/bot.png";
import userImage from "../assets/defaultUser.jpg";


export const ChatForm = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Adicionar mensagem inicial do bot quando o componente é montado
        setMessages([{ text: "Olá! Posso ajudar com alguma coisa?", isBot: true , image: botImage}]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/openai/chat-completions', { message });
            const newCompletion = response.data.completion;
            
            setMessages([...messages, { text: message, isBot: false, image: userImage }, { text: newCompletion, isBot: true, image: botImage }]);
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar solicitação para a API da OpenAI:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-96 h-64 mt-6 border bg-gray-100 rounded-lg overflow-y-scroll mb-4 p-4 relative">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end '}`}>
                        <div className={` rounded p-2 mb-2 ${msg.isBot ? 'rounded border bg-[#e4cb90]' : 'rounded border bg-white'}`}>
                            <div className="flex items-center ">
                                {msg.isBot ? <img src={msg.image} alt="Bot" className="w-8 h-8 mr-2" /> : <img src={msg.image} alt="User" className="w-8 h-8 mr-2" />}
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center justify-between mb-6">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Digite sua mensagem"
                    className="w-3/4 p-3 border border-gray-300 rounded-l-md"
                />
                <button 
                    type="submit" 
                    className="w-1/4 p-3 rounded-r-md bg-[#ccb681] text-white"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default ChatForm;