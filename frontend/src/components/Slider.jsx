import React, { useState } from 'react';
import SlideSlot from '../assets/slot-machine.jpg';
import SlideBlackjack from '../assets/blackjack-table.jpeg';
import SlideRoleta from '../assets/roulette-table.jpg';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const slides = [
        { src: SlideSlot, title: 'Slots', description: 'Com uma ampla gama de temas, gráficos deslumbrantes e efeitos sonoros imersivos, as Slots oferecem uma experiência de jogo emocionante para todos os gostos.' },
        { src: SlideBlackjack, title: 'Blackjack', description: 'Compete contra o dealer para alcançar uma mão com valor próximo de 21, sem ultrapassá-lo' },
        { src: SlideRoleta, title: 'Roleta', description: ' Aposta em números, cores ou outras características na esperança de prever onde a bola vai parar.' }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const navigate = useNavigate();

    const redirectToRegister = () => {
        // Redirecionar para a página de registro quando o botão "Começar" for clicado
        navigate('/register');
    };

    return (
        <div id="slider" className="relative overflow-hidden group text-white font-roboto">
            <div style={{ backgroundImage: `url(${slides[currentIndex].src})`, height: '50vh'}} className="w-full bg-center bg-cover transition-all duration-500">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-gradient-to-b from-black via-transparent to-black opacity-80 p-8">
                    <p className='text-[#bda774] font-bold p-2'>OS NOSSOS JOGOS</p>
                    <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl text-center mb-4">{slides[currentIndex].title}</h1>
                    <p className="md:text-2xl text-base font-regular text-center mb-8 w-[80%]">{slides[currentIndex].description}</p>
                    <button className="bg-[#bda774] px-4 py-2 rounded hover:bg-[#897952] transition-colors" onClick={redirectToRegister}>Começar</button>
                </div>
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x translate-y-[-50%] left-5 text-2xl p-2  cursor-pointer transform hover:scale-110 transition-transform'>
                <BsChevronCompactLeft onClick={prevSlide} size={40}/>
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x translate-y-[-50%] right-5 text-2xl p-2  cursor-pointer transform hover:scale-110 transition-transform'>
                <BsChevronCompactRight onClick={nextSlide} size={40}/>
            </div>
        </div>
    );
};

export default Slider;