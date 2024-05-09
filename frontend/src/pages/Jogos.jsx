import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GamesCard from '../components/GamesCard';
import ChatForm from '../components/ChatAssistente';

const   Jogos = () => {
  return (
    <div>
      <Header title="Jogos" />
      <div className='relative max-w-[1240px] mx-auto text-center'>
      <p className=' p-4 text-orange-300 text-xl md:text-2xl font-extrabold font-sarabun'>JOGAR</p>
      <h2 className='font-bold text-3xl md:text-5xl'>Os nossos jogos</h2>
      </div>
      <GamesCard/>
      <Footer />
    </div>
  );
};

export default Jogos;