import React, { useState } from 'react'

const CommentSection = () => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);

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
        // Limpar o input após o envio
        setComment('');
    };
    return (
        <div>
            <div className='max-w-[1240px] mx-auto py-8 px-4 bg-white font-sarabun border-b border-opacity-25 border-gray-500'>
                <h1 className='text-4xl font-bold'>Comentários</h1>
                <div className='mt-4'>
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
                    <button className={`mt-2 px-4 py-2 bg-yellow-400 text-white rounded-lg transition-colors duration-300 ${comment ? 'hover:bg-yellow-600 focus:outline-none' : 'cursor-not-allowed bg-yellow-800 opacity-50'}`} onClick={handleSubmit} disabled={!comment}>Enviar</button>
                </div>
            </div>
            <div className='max-w-[1240px] mx-auto py-6 px-4'>
                <h1 className='text-lg'>[Nome do utilizador que comenta]</h1>
            </div>
        </div>
    )
}

export default CommentSection