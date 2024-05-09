import React from 'react'
import AposteEmQualquerLugar from '../assets/AposteEmQualquerLugar.png'
import { ReactTyped } from 'react-typed'
import { useNavigate } from 'react-router-dom';

const Resumo = () => {
  const navigate = useNavigate();

    const redirectToRegister = () => {
        // Redirecionar para a página de registro quando o botão "Começar" for clicado
        navigate('/register');
    };
  return (
    <div className='relative w-full justify-center items-center text-white font-roboto'>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-100 p-8">
        <img src={AposteEmQualquerLugar} alt="AposteEmQualquerLugar" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: '0.2' }} />
      </div>
      <div className='relative max-w-[1240px] mx-auto text-center'>
        <p className='text-[#bda774] font-bold p-6'>EM QUALQUER LUGAR</p>
        <h1 className=' text-3xl md:text-5xl lg:text-6xl mb-2 '>Aposte em Qualquer Lugar</h1>
        <p className='md:text-4xl sm:text-3xl text-xl font-bold py-2 '>Conforme a sua preferência.
          <ReactTyped className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2' strings={['Telemóvel', 'Tablet', 'Laptop']} typeSpeed={100} backSpeed={120} loop /></p>
        <p className="md:text-2xl text-xl font-regular text-center mt-20 mb-4">Quer começar a jogar em qualquer lugar? Pode estar no conforto de casa ou no trabalho! </p>
        <button className="bg-[#bda774] px-4 py-2 rounded hover:bg-[#897952] transition-colors mb-10 " onClick={redirectToRegister}>Começar</button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

  );
};

export default Resumo