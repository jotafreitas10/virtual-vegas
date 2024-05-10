import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToggleSwitch from '../components/ToggleSwitch';

const   Definicoes = () => {
    return (
      <div>
        <Header title="Definições" />
        <div className='relative max-w-[1240px] mx-auto'>
        <p className=' p-4 text-orange-300 text-xl md:text-2xl font-extrabold font-sarabun'>JOGAR </p>
        <h2 className='font-bold text-3xl md:text-5xl'>Os nossos jogos</h2>
        <ToggleSwitch />
        </div>
        
        <Footer />
      </div>
    );
  };
  
  export default Definicoes;
