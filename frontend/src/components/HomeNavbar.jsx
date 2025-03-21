import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Logo from "../assets/logo.png"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  const [nav, setNav] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation();

  const handleNav = () => {
    setNav(!nav);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen); // Alternar o estado do menu de perfil
  };

  return (
    <div className="flex justify-between items-center text-xl h-24 max-w-[1240px] mx-auto px-6 text-black font-roboto">
      <img src={Logo} alt="VirtualVegas Logo" className="h-20 w-20" />
      <ul className='hidden md:flex'>
        <li className='p-4 cursor-pointer'><Link to='/home'>Início</Link></li>
        <li className='p-4 cursor-pointer'><Link to='/jogos'>Jogos</Link></li>
        <li className='p-4 cursor-pointer'><Link to='/sobre'>Sobre</Link></li>
        <li className='p-4 cursor-pointer'><Link to='/suporte'>Suporte</Link></li>
      </ul>
      <img src={userInfo.profileImage} alt='Profile Pic' onClick={handleProfileMenu} className='p-4 cursor-pointer hidden md:flex h-[90px] w-[90px] rounded-full' />
      <div className={profileMenuOpen ? 'fixed flex-col hidden md:flex justify-between text-sm right-0 top-0 w-[35%] h-full border-l border-gray-600 bg-[#ffe29e] ease-in-out duration-500 z-40' : 'fixed flex-col flex justify-between text-sm right-[-100%] top-0 w-[60%] h-full border-l border-r-gray-900 bg-[#ffe29e] ease-in-out duration-500 z-40'}>
        <div className="flex items-center">
          <img src={userInfo.profileImage} alt="Profile Pic" className="h-[70px] w-[70px] rounded-full mx-auto my-4 ml-4" />
          <p className="xl:text-3xl lg:text-2xl text-xl font-sarabun font-bold cursor-default" id='username'>{userInfo.username}</p>
          <div onClick={handleProfileMenu} className="cursor-pointer mx-auto my-4 mr-4">
            <AiOutlineClose className="size-6" />
          </div>
        </div>
        <ul className="uppercase p-4">
          <Link to={`/${userInfo.username}/editar-perfil`}><li className="p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">Perfil</li></Link>
          <li className='p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer'><Link to='/definicoes'>Definições</Link></li>
        </ul>
        <div className="uppercase p-4 mt-auto">
          <div onClick={logoutHandler} className="flex items-center justify-between p-4 border-t border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">
            <p>Terminar Sessão</p>
            <TbLogout />
          </div>
        </div>
      </div>
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <AiOutlineClose className='hover:size-7 ease-in-out duration-300' /> : <AiOutlineMenu className='hover:size-7 ease-in-out duration-300' />}
      </div>
      <div className={nav ? 'fixed md:hidden flex-col flex justify-between text-sm left-0 top-0 w-[60%] h-full border-r border-gray-600 bg-[#ffe29e] ease-in-out duration-500 z-40' : 'fixed md:hidden flex-col flex justify-between text-sm left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#ffe29e] ease-in-out duration-500 z-40'}>
        <div className='flex items-center'>
          <img src={Logo} alt="VirtualVegas Logo" className="h-20 w-20 my-4 ml-4" />
          <p className='sm:text-3xl text-2xl font-sarabun font-bold mx-auto cursor-default'>VirtualVegas</p>
        </div>
        <ul className='uppercase p-4'>
          <Link to='/home'><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Início</li></Link>
          <Link to='/jogos'><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Jogos</li></Link>
          <Link to='/sobre'><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Sobre</li></Link>
          <Link to='/suporte'><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Suporte</li></Link>
          <Link to={`/${userInfo.username}/editar-perfil`}><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Perfil</li></Link>
          <Link to='/definicoes'><li className='p-4 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Definições</li></Link>
        </ul>
        <div className='uppercase p-4 mt-auto'>
          <div onClick={logoutHandler} className='flex items-center justify-between p-4 border-t border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>
            <p>Terminar Sessão</p>
            <TbLogout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar