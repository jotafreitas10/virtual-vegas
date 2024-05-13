import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../components/ToggleSwitch';
import BgDef from '../assets/mesacasino.jpg'
import { IoChevronBackOutline } from "react-icons/io5";

const Definicoes = () => {
    const navigateTo = useNavigate();
    const handleGoBack = () => {
        navigateTo('/home');
    };
    return (
        <div className='relative'>
            <img src={BgDef} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
            <div className='flex flex-col items-center text-white'>
                <div className='items-start flex justify-between xl:w-[1240px] lg:w-[1024px] md:w-[768px] sm:w-[576px] w-[470px] mb-8 mt-16 backdrop-blur-none'>
                    <div className='flex items-center cursor-pointer' onClick={handleGoBack}>
                        <IoChevronBackOutline className="h-5 w-5 mr-3" />
                        <p className='text-2xl font-inter font-medium'>Voltar</p>
                    </div>
                </div>
                <div className='max-w-[1240px] mx-auto text-white bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70'>
                    <h2 className='pb-4 text-2xl text-center md:text-4xl font-extrabold font-sarabun'>Gestão de consentimento </h2>
                    <div className='font-bold py-4 text-lg md:text-2xl flex flex-col '>
                        <p>Pode alterar as suas preferências em qualquer notícia e promoções que vai receber da nossa parte, bem como os canais de comunicação.</p>
                        <ul className='p-4 font-normal text-base md:text-xl'>
                            <li className="flex justify-between items-center mb-3">Quero receber informações sobre Bónus e Ofertas. Percebo que posso cancelar este serviço a qualquer momento.<ToggleSwitch /></li>
                            <li className="flex justify-between items-center mt-3">Quero receber novidades e material promocional.<ToggleSwitch /></li>
                        </ul>
                    </div>
                    <div className='font-bold pt-4 text-lg md:text-2xl flex flex-col'>
                        <p>Podes entrar em contacto comigo através dos seguintes canais:</p>
                        <ul className='p-4 font-normal text-base md:text-xl'>
                            <li className="flex justify-between items-center mb-3">Email<ToggleSwitch /></li>
                            <li className="flex justify-between items-center my-3">Telefone<ToggleSwitch /></li>
                            <li className="flex justify-between items-center my-3">SMS<ToggleSwitch /></li>
                            <li className="flex justify-between items-center my-3">Correio<ToggleSwitch /></li>
                            <li className="flex justify-between items-center mt-3">Notificações<ToggleSwitch /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Definicoes;