import React, { useState } from 'react';
import axios from 'axios';

const ChatForm = () => {
    const [message, setMessage] = useState('');
    const [completion, setCompletion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/openai/chat-completions', { message });
            setCompletion(response.data.completion);
        } catch (error) {
            console.error('Erro ao enviar solicitação para a API da OpenAI:', error);
        }
    };

    return (
        <div className='max-w-[1240px] mx-auto py-8 px-4 bg-white font-sarabun border-b border-opacity-25 border-gray-500'>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
            <div>{completion}</div>
        </div>
    );
}

export default ChatForm;