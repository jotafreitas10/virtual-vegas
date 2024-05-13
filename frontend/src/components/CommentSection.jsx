import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const CommentSection = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    // Função para calcular a diferença de tempo entre duas datas e retornar uma string formatada
    const formatTimeDifference = (date) => {
        const currentDate = new Date();
        const commentDate = new Date(date);
        const differenceInMilliseconds = currentDate - commentDate;
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);
        const differenceInWeeks = Math.floor(differenceInDays / 7);
        const differenceInMonths = Math.floor(differenceInDays / 30);

        if (differenceInMonths > 0) {
            return `há ${differenceInMonths} mês${differenceInMonths === 1 ? '' : 's'}`;
        } else if (differenceInWeeks > 0) {
            return `há ${differenceInWeeks} semana${differenceInWeeks === 1 ? '' : 's'}`;
        } else if (differenceInDays > 0) {
            if (differenceInDays === 1) {
                return 'Ontem';
            } else {
                return `há ${differenceInDays} dia${differenceInDays === 1 ? '' : 's'}`;
            }
        } else if (differenceInHours > 0) {
            return `há ${differenceInHours} hora${differenceInHours === 1 ? '' : 's'}`;
        } else if (differenceInMinutes > 0) {
            return `há ${differenceInMinutes} minuto${differenceInMinutes === 1 ? '' : 's'}`;
        } else {
            return 'Agora mesmo';
        }
    };

    useEffect(() => {
        setLoadingComments(true);
        const fetchComments = async () => {
            try {
                const gameName = getGameNameFromURL();
                const response = await axios.get(`/api/comments/game/${gameName}`);
                setComments(response.data);
            } catch (error) {
                console.error('Erro ao obter os comentários:', error.message);
            } finally {
                setLoadingComments(false);
            }
        };

        fetchComments();
    }, []);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = async () => {
        setIsCommenting(true)
        try {
            const gameName = getGameNameFromURL();
            await axios.post('/api/comments', { text: comment, gameName });
            const response = await axios.get(`/api/comments/game/${gameName}`);
            setComments(response.data);
            setComment('');
        } catch (error) {
            console.error('Erro ao enviar o comentário:', error.message);
        } finally {
            setIsCommenting(false);
        }
    };

    const getGameNameFromURL = () => {
        const pathname = window.location.pathname;
        return pathname.split('/').pop();
    };

    return (
        <div className="max-w-[1240px] mx-auto p-8 bg-white font-sarabun border-b border-opacity-25 border-gray-500">
            <div className="flex flex-col items-start">
                <div className="mb-4 flex items-center">
                    <img src={userInfo.profileImage} alt="Imagem de Perfil" className="w-10 h-10 rounded-full mb-2" />
                    <h1 className='text-lg font-bold ml-3 mb-2'>{userInfo.username}</h1>
                </div>
                <div className='w-full'>
                    <div className='relative'>
                        <label htmlFor="commentInput" className={`absolute px-2 ml-1 bg-white text-gray-700 cursor-text transition-transform duration-300 ${comment ? '-translate-y-1 scale-75' : 'translate-y-3 scale-100'}`}>
                            Escreve um comentário
                        </label>
                        <textarea
                            id="commentInput"
                            className="w-full mt-2 px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:border-yellow-600 focus:shadow-md"
                            rows="3"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                    </div>
                    {isCommenting ? (
                        <div className="flex items-center justify-center text-white">
                            <Oval
                                type="Oval"
                                color="#00BFFF"
                                height={30}
                                width={30}
                            />
                        </div>
                    ) : (<button className={`mt-2 px-4 py-2 bg-yellow-400 text-white rounded-lg transition-colors duration-300 ${comment ? 'hover:bg-yellow-600 focus:outline-none' : 'cursor-not-allowed bg-yellow-800 opacity-50'}`} disabled={!comment} onClick={handleSubmitComment}>Enviar</button>
                    )}
                </div>
            </div>
            <div className="mt-4 w-full">
                <h1 className='text-lg'>Comentários:</h1>
                {isLoadingComments ? (
                    <div className="flex items-center justify-center text-white">
                        <Oval
                            type="Oval"
                            color="#00BFFF"
                            height={30}
                            width={30}
                        />
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="flex items-start border-b-2 my-1 p-2">
                            <img src={`http://localhost:5000/${comment.user.profileImage.replace(/\\/g, '/').replace('public/', '')}`} alt="Imagem de Perfil" className="w-8 h-8 rounded-full mr-2" />
                            <div>
                                <p className="font-semibold">{comment.user.name}</p>
                                <p className="text-gray-600 text-base">{comment.text}</p>
                                <p className="text-gray-500 text-xs">{formatTimeDifference(comment.createdAt)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;