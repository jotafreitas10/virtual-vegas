import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import userImage from "../assets/defaultUser.jpg";

const CommentSection = ({ userName, userProfileImage }) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [comments, setComments] = useState([]);
    const userInfo = useSelector((state) => state.auth.userInfo);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleSubmit = () => {
        // Lógica para enviar o comentário
        console.log('Comentário enviado:', comment);
        // Adiciona o novo comentário à lista de comentários
        const currentTime = new Date().toLocaleTimeString();
        setComments([...comments, { text: comment, time: currentTime }]);
        // Limpar o input após o envio
        setComment('');
    };

    return (
        <div className="max-w-[1240px] mx-auto p-8 bg-white font-sarabun border-b border-opacity-25 border-gray-500">
            <div className="flex flex-col items-start">
                <div className="mb-4 flex items-center">
                {userProfileImage ? (
                        <img src={userProfileImage} alt="Imagem de Perfil" className="w-10 h-10 rounded-full mb-2" />
                    ) : (
                        <img src={userInfo.profileImage || userImage} alt="Imagem de Perfil" className="w-10 h-10 rounded-full mb-2" />
                    )}
                    <h1 className='text-lg font-bold ml-3 mb-2'>{userInfo.username}</h1>
                    
                </div>
                <div className='w-full'>
                    <div className='relative'>
                        <label htmlFor="commentInput" className={`absolute px-2 ml-1 bg-white text-gray-700 cursor-text transition-transform duration-300 ${isFocused || comment ? '-translate-y-1 scale-75' : 'translate-y-3 scale-100'}`}>
                            Escreve um comentário
                        </label>
                        <textarea
                            id="commentInput"
                            className="w-full mt-2 px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-yellow-600 focus:shadow-md"
                            rows="3"
                            value={comment}
                            onChange={handleCommentChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        ></textarea>
                    </div>
                    <button className={`mt-2 px-4 py-2 bg-yellow-400 text-white rounded-lg transition-colors duration-300 ${comment ? 'hover:bg-yellow-600 focus:outline-none' : 'cursor-not-allowed bg-yellow-800 opacity-50'}`} onClick={handleSubmit} disabled={!comment}>Enviar</button>
                </div>
            </div>
            <div className="mt-4 w-full">
                <h1 className='text-lg'>Comentários:</h1>
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start mt-2">
                        {userProfileImage ? (
                            <img src={userProfileImage} alt="Imagem de Perfil" className="w-8 h-8 rounded-full mr-2" />
                        ) : (
                            <img src={userInfo.profileImage || userImage} alt="Imagem de Perfil" className="w-8 h-8 rounded-full mr-2" />
                        )}
                        <div>
                            <p className="font-semibold">{userName}</p>
                            <p className="text-gray-600 text-sm">{comment.text}</p>
                            <p className="text-gray-500 text-xs">{comment.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;