import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BgRegister from '../assets/roletaRegister.jpg';
import { BiUser } from 'react-icons/bi';
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineUnlock, AiOutlineMail } from 'react-icons/ai'
import { BiCalendarEvent } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { validateEmail, validateDateOfBirth, validateName, validateUsername } from '../utils/validators';

const Register = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigateTo('/home');
    }
  }, [navigateTo, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Por favor, insira um endereço de e-mail válido');
      return;
    }

    if (!validateDateOfBirth(dateOfBirth)) {
      toast.error('Por favor, insira uma data de nascimento válida no formato DD/MM/AAAA');
      return;
    }

    if (!validateName(name)) {
      toast.error('Por favor, insira um nome válido');
      return;
    }

    if (!validateUsername(username)) {
      toast.error('Por favor, insira um nome de utilizador válido. Utilize apenas letras, números, ponto (.) e underline (_)');
      return;
    }

    try {
      const res = await register({ name, username, email, dateOfBirth, password }).unwrap();
      toast.success("Registo efetuado com sucesso!");
      navigateTo('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const handleGoBack = () => {
    navigateTo('/');
  };

  return (
    <div className='relative'>
      <img src={BgRegister} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="h-[100vh] lg:max-w-[1080px] max-w-[768px] mx-auto flex flex-col text-white font-roboto">
        <div className='items-start w-full flex justify-between mb-4 mt-16 backdrop-blur-none'>
          <div className='flex items-center cursor-pointer' onClick={handleGoBack}>
            <IoChevronBackOutline className="h-5 w-5 mr-3" />
            <p className='text-2xl font-inter font-medium'>Voltar</p>
          </div>
        </div>
        <div className="bg-black border mx-auto w-min border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70 relative">
          <h1 className="text-4xl font-bold mb-6 text-center cursor-default">Registo</h1>
          <form onSubmit={submitHandler}>
            <div className='relative mt-5 mb-6'>
              <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome</label>
              <BiUser className='absolute top-2 right-4' />
            </div>
            <div className='relative my-6'>
              <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome de utilizador</label>
              <BiUser className='absolute top-2 right-4' />
            </div>
            <div className='relative my-6'>
              <input type="text" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 group">Data de nascimento</label>
              <BiCalendarEvent className='absolute top-2 right-4' />
            </div>
            <div className='relative my-6'>
              <input type="email" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Endereço de E-mail</label>
              <AiOutlineMail className='absolute top-2 right-4' />
            </div>
            <div className='relative my-6'>
              <input type="password" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Palavra-passe</label>
              <AiOutlineUnlock className='absolute top-2 right-4' />
            </div>
            <div className='relative mb-5 mt-6'>
              <input type="password" className="block w-72 py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Confirmar Palavra-passe</label>
              <AiOutlineUnlock className='absolute top-2 right-4' />
            </div>
            <button type='submit' className="text-white font-semibold hover:bg-[#7e704d] bg-[#bda774] mb-4 mt-6 text-[18px] py-2 rounded-full transition-colors duration-300 w-full">Criar Conta</button>
            <div className='text-center'>
              <p>Já tem conta?</p>
              <Link to='/login' className='font-semibold hover:underline'>Inicie Sessão aqui</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register