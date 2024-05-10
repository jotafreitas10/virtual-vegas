import React, { useState, useEffect } from 'react';
import axios from 'axios';
import botImage from "../assets/bot.png";
import userImage from "../assets/defaultUser.jpg";
import { useSelector, useDispatch } from 'react-redux';

export const ChatForm = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        // Adicionar mensagem inicial do bot quando o componente é montado
        setMessages([{ text: "Olá! Sou o ChatBot, posso ajudar com alguma coisa?", isBot: true, image: botImage }]);
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
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
        <div className="justify-between font-sarabun">
            <h1 className="text-3xl md:text-4xl font-extrabold mt-10 ml-5 md:ml-0 mb-1 md:mb-4">FALE CONNOSCO!</h1>
            <p className="text-xl font-light hidden md:block "style={{ textAlign: 'justify' }}>
                Bem-vindo ao nosso assistente virtual. Está aqui para ajudá-lo com qualquer dúvida ou problema que você possa ter. Por favor, sinta-se à vontade para fazer perguntas ou solicitar assistência relacionada aos nossos serviços.
            </p>
        </div>
        <div className="flex flex-col items-center">
            <div className="w-96 h-64 mt-0 md:mt-10 border bg-gray-100 rounded-lg overflow-y-scroll mb-4 p-4 relative">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded p-2 mb-2 ${msg.isBot ? 'rounded border bg-[#e4cb90]' : 'rounded border bg-white'}`}>
                            <div className="flex items-center ">
                               <img src={msg.isBot ? msg.image : (userInfo.profileImage ? userInfo.profileImage : userImage)} alt={msg.isBot ? "Bot" : "User"} className="w-8 h-8 mr-2" />
                                <p className="text-base">{msg.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center justify-between mb-10">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem"
                    className="w-3/4 p-3 border border-gray-300 rounded-l-md"
                />
                <button
                    type="submit"
                    className="w-1/4 p-3 rounded-r-md bg-[#f5d17c] text-white"
                >
                    Enviar
                </button>
            </form>
        </div>
    </div>
);
}
export default ChatForm;