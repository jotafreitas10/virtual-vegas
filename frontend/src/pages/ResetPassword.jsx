import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BgLogin from '../assets/roletaLogin.jpg';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/reset-password', { email: email });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status de erro
        setMessage(error.response.data.message);
      } else if (error.request) {
        // A solicitação foi feita, mas não recebeu resposta
        setMessage('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        // Ocorreu um erro ao configurar a solicitação
        setMessage('Erro ao enviar a solicitação. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div>
      <img src={BgLogin} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="h-[100vh] flex justify-center items-center text-white font-roboto">
        <div className="bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70 relative">
          <h1 className="text-4xl font-bold mb-6 text-center">Recuperar palavra-passe</h1>
          <form onSubmit={handleSubmit}>
            <div className='relative mt-5 mb-6 border-b-2 border-gray-300'>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-72 py-2.3 px-0 text-lg bg-transparent  appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="email" required />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Endereço de E-mail</label>
              <BiUser className='absolute top-2 right-4' />
            </div>
            <button type="submit" className="text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded-full transition-colors duration-300 w-full">Enviar E-mail de Recuperação</button>
          </form>
          {message && <p>{message}</p>}
          <div className='text-center'>
            <p>Não tem conta?</p>
            <Link to='/register' className='font-semibold hover:underline'>Registe-se já!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;