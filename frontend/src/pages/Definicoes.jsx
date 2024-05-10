import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToggleSwitch from '../components/ToggleSwitch';

const   Definicoes = () => {
    return (
      <div>
      <Header title="Definições" />
      <div className='max-w-[1240px] mx-auto'>
          <h2 className='p-4 text-xl md:text-2xl font-extrabold font-sarabun'>Gestão de consentimento </h2>
          <div className='font-normal p-4 text-lg md:text-xl flex items-center'>
              <p>Pode alterar as suas preferências em qualquer notícia e promoções que vai receber da nossa parte, bem como os canais de comunicação.</p>
              <p>Os nossos jogos</p><ToggleSwitch />
          </div>
      </div>
      <Footer />
  </div>
    );
  };
  
  export default Definicoes;
