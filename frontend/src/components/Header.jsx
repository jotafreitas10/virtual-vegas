import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TbLogout } from "react-icons/tb";
import DefPP from '../assets/defaultUser.jpg';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsChevronCompactDown } from "react-icons/bs";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import HeaderIMG from "../assets/headercartas.png";
import Logo from "../assets/logo.png";

const Header = ({ title }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [nav, setNav] = useState(false);
  const [profileMenuOpenSM, setProfileMenuOpenSM] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

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
    setProfileMenuOpen(!profileMenuOpen); // Toggle profile menu state
  };

  const handleProfileMenuSM = () => {
    setProfileMenuOpenSM(!profileMenuOpenSM); // Toggle profile menu state for small screens
  };

  const handleNav = () => {
    setNav(!nav); // Toggle navigation state for small screens
  };
  return (
    <div className="relative font-sarabun">
      <img src={HeaderIMG} className="object-cover w-full max-h-[500px] md:max-h-[300px]" alt="Header Image" />
      <div className="absolute top-0 left-0 right-0 flex justify-between max-w-[1240px] text-xl h-24 mx-auto items-center px-6 text-white font-roboto">
        <img src={Logo} alt="VirtualVegas Logo" className="h-20 w-20" />
        <ul className="hidden md:flex"> 
          <li className=" p-4 cursor-pointer"><Link to='/home'>Início</Link></li>
          <li className=" p-4 cursor-pointer"><Link to='/jogos'>Jogos</Link></li>
          <li className=" p-4 cursor-pointer"><Link to='/sobre'>Sobre</Link></li>
          <li className=" p-4 cursor-pointer"><Link to='/suporte'>Suporte</Link></li>
        </ul>
        <img src={userInfo.profileImage} alt='Profile Pic' onClick={handleProfileMenu} className='p-4 cursor-pointer hidden md:flex h-[90px] w-[90px] rounded-full' />
        <div className={!profileMenuOpen ? 'fixed flex-col hidden md:flex justify-between text-sm right-0 top-0 w-[35%] h-full border-l border-gray-600 bg-[#242424] ease-in-out duration-500 z-40' : 'fixed flex-col flex justify-between text-sm right-[-100%] top-0 w-[60%] h-full border-l border-r-gray-900 bg-[#242424] ease-in-out duration-500 z-40'}>
          <div className="flex items-center">
            <img src={userInfo.profileImage} alt="Profile Pic" className="h-[70px] w-[70px] rounded-full mx-auto my-4 ml-4" />
            <p className="xl:text-3xl lg:text-2xl text-xl font-sarabun font-bold cursor-default" id='username'>{userInfo.username}</p>
            <div onClick={handleProfileMenu} className="cursor-pointer mx-auto my-4 mr-4">
              <AiOutlineClose className="size-6" />
            </div>          
          </div>
          <ul className="uppercase p-4">
            <Link to={`/${userInfo.username}/editar-perfil`}><li className="p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">Editar Perfil</li></Link>
            <li className='p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer'>Estatísticas</li>
            <li className='p-4 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer'>Definições</li>
          </ul>
          <div className="uppercase p-4 mt-auto">
            <div onClick={logoutHandler} className="flex items-center justify-between p-4 border-t border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">
              <p>Terminar Sessão</p>
              <TbLogout />
            </div>
          </div>
        </div>
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose className='hover:size-7 ease-in-out duration-300'/> : <AiOutlineMenu className='hover:size-7 ease-in-out duration-300'/>}
        </div>
        <div className={nav ? 'fixed md:hidden flex-col flex justify-between text-sm left-0 top-0 w-[60%] h-full border-r border-gray-600 bg-[#242424] ease-in-out duration-500 z-40' : 'fixed md:hidden flex-col flex justify-between text-sm left-[-100%] top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#242424] ease-in-out duration-500 z-40'}>
          <div className='flex items-center'>
            <img src={Logo} alt="VirtualVegas Logo" className="h-20 w-20 my-4 ml-4"/>
            <p className='sm:text-3xl text-2xl font-sarabun font-bold mx-auto cursor-default'>VirtualVegas</p>
          </div>
          <ul className='uppercase p-4'>
            <li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'><Link to='/home'>Início</Link></li>
            <Link to='/jogos'><li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>Jogos</li></Link>
            <li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'><Link to='/sobre'>Sobre</Link></li>
            <li className='p-4 border-b border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'><Link to='/suporte'>Suporte</Link></li>
            <li className='p-4 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer' onClick={handleProfileMenuSM}>Perfil</li>
          </ul>
          <div className={profileMenuOpenSM ? 'fixed flex-col md:hidden flex justify-between text-sm left-0 top-0 w-[35%] h-full border-r border-gray-600 bg-[#242424] ease-in-out duration-500 z-40' : 'fixed flex-col flex justify-between text-sm left-[-100%] top-0 w-[60%] h-full border-l border-r-gray-900 bg-[#242424] ease-in-out duration-500 z-40'}>
            <AiOutlineClose onClick={handleProfileMenuSM} className="size-6" />
            <ul className="uppercase p-4">
              <Link to={`/${userInfo.username}/editar-perfil`}><li className="p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">Editar Perfil</li></Link>
              <li className='p-4 border-b border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer'>Estatísticas</li>
              <li className='p-4 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer'>Definições</li>
            </ul>
            <div className="uppercase p-4 mt-auto">
              <div onClick={logoutHandler} className="flex items-center justify-between p-4 border-t border-gray-600 lg:hover:text-xl hover:text-lg lg:text-lg text-md ease-in-out duration-300 cursor-pointer">
                <p>Terminar Sessão</p>
                <TbLogout />
              </div>
            </div>
          </div>
          <div className='uppercase p-4 mt-auto'>
            <div onClick={logoutHandler} className='flex items-center justify-between p-4 border-t border-gray-600 sm:hover:text-xl hover:text-lg ease-in-out duration-300 cursor-pointer'>
              <p>Terminar Sessão</p>
              <TbLogout/>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-2 flex flex-col items-center justify-center'>
        <h1 className="text-center md:text-6xl sm:text-4xl text-3xl mt-6 md:mt-2 font-extrabold text-white">{title}</h1>
        <BsChevronCompactDown className='text-white text-4xl hover:text-gray-300 transition duration-300 mb-0 md:mb-8 lg:mb-16 mt-0 sm:mt-2 lg:mt-4 size-6 sm:size-8 md:size-10'/>
      </div>
    </div>
  );
};

export default Header;