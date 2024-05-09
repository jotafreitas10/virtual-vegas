import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed'
import { BsChevronCompactDown } from 'react-icons/bs';

const Intro = () => {
    const navigate = useNavigate();
    const scrollToSlider = () => {
        const sliderElement = document.getElementById('slider');
        sliderElement.scrollIntoView({ behavior: 'smooth' });
    };

    const redirectToRegister = () => {
        // Redirecionar para a página de registro quando o botão "Começar" for clicado
        navigate(`/register`);
    };

    return (
        <div className='text-white font-inter'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-[#bda774] font-bold p-2'>JOGUE SEM LIMITES</p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Junte-se a nós</h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-4xl sm:text-3xl text-xl font-bold py-2'>Tudo o que você precisa.</p>
                    <ReactTyped className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2' strings={['Blackjack','Slots','Roleta']} typeSpeed={100} backSpeed={120} loop/>
                </div>
                <p className='md:text-2xl text-xl font-regular'>Quer começar a jogar? Introduza o seu e-mail para criar ou aceder à sua conta.</p>
                <div className='flex flex-col sm:flex-row justify-center items-center'>
                    <input type="text" className="w-[350px] rounded border border-[#808080b3] bg-[#161616b3] text-[#ffffff4d] my-2 mx-auto sm:mr-2 py-3 pl-4 sm:w-[400px] font-medium focus:text-white" placeholder='Endereço de E-mail' />
                    <button className='bg-[#bda774] w-auto sm:w-[150px] rounded font-medium my-2 mx-auto sm:ml-1 py-[10px] px-8 sm:py-3 sm:px-2 hover:bg-[#897952] transition-colors' onClick={redirectToRegister}>Começar</button> 
                </div>
                <div className="flex justify-center mt-8">
                <BsChevronCompactDown
                    className="text-white text-4xl cursor-pointer hover:text-gray-300 transition duration-300 transform hover:scale-105"
                    onClick={scrollToSlider}/>
                </div>
            </div>
        </div>
    )
}

export default Intro