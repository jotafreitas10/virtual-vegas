import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import pf from '../assets/pf.png';
import av from '../assets/av.png';
import { useNavigate, Link } from 'react-router-dom';

const   Suporte = () => {
  return (
    <div>
      <Header title="Suporte" />
      <div className='w-full py-[10rem] px-4 bg-white'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-8'>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 md:hover:my-2 rounded-lg hover:scale-105 duration-300'>
                <img className='w-40 mb-4 mx-auto mt-[-3rem] bg-white' src={pf} alt="/" />
                <h2 className='text-2xl font-bold text-center py-8'>Perguntas Frequentes</h2>
                <p className='mb-8 text-center text-xl font-bold'>Respostas a perguntas comuns</p>
                <button className='bg-[#bda774] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-[#897952] transition-colors'><Link to='/suporte/perguntasfrequentes'>Veja as Respostas</Link></button>
            </div>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 md:hover:my-2 rounded-lg hover:scale-105 duration-300'>
                <img className='w-40 mb-4 mx-auto mt-[-3rem] bg-white' src={av} alt="/" />
                <h2 className='text-2xl font-bold text-center py-8'>Assistente Virtual</h2>
                <p className=' mb-1 text-center text-xl font-bold'>Suporte ao cliente automatizado e personalizado aos jogadores</p>
                <button className='bg-[#bda774] w-[200px] rounded-md font-medium my-6 mx-auto px-5 py-3 hover:bg-[#897952] transition-colors'><Link to='/suporte/assistentevirtual'>Fale com o Assistente</Link></button>
            </div>
            </div>
            </div>
      <Footer />
    </div>
  );
};

export default Suporte;