import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToggleSwitch from '../components/ToggleSwitch';

const Definicoes = () => {
    return (
        <div>
            <Header title="Definições" />
            <div className='max-w-[1240px] mx-auto'>
                <h2 className='p-4 text-3xl md:text-4xl font-extrabold font-sarabun'>Gestão de consentimento </h2>
                <div className='font-bold p-4 text-lg md:text-2xl flex flex-col'>
                    <p>Pode alterar as suas preferências em qualquer notícia e promoções que vai receber da nossa parte, bem como os canais de comunicação.</p>
                    <ul className='p-4 font-normal md:text-xl'>
                        <li className="flex justify-between items-center"> Quero receber informações sobre Bónus e Ofertas. Percebo que posso cancelar este serviço a qualquer momento.<ToggleSwitch /></li>
                        <li className="flex justify-between items-center"> Quero receber novidades e material promocional.<ToggleSwitch /></li>
                    </ul>
                </div>
                <div className='font-bold p-4 text-lg md:text-2xl flex flex-col'>
                    <p>Podes entrar em contacto comigo através dos seguintes canais:</p>
                    <ul className='p-4 font-normal md:text-xl'>
                        <li className="flex justify-between items-center"> Email<ToggleSwitch /></li>
                        <li className="flex justify-between items-center"> Telefone<ToggleSwitch /></li>
                        <li className="flex justify-between items-center"> SMS<ToggleSwitch /></li>
                        <li className="flex justify-between items-center"> Correio<ToggleSwitch /></li>
                        <li className="flex justify-between items-center"> Notificações<ToggleSwitch /></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Definicoes;