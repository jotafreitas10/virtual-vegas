import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import Bgslots from '../assets/slots.jpg';
import Slider from '../components/Slider';
import Resumo from '../components/Resumo';

const Inicio = () => {
  const navigate = useNavigate();
  const { userInfo }= useSelector((state) => state.auth);

  useEffect(()=>{
      if (userInfo) {
          navigate('/home');
      }
  }, [navigate, userInfo]);
  return (
    <div>
        <img src={Bgslots} alt="Background Image" className="absolute inset-0 w-full h-full object-cover z-0"/>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div className="relative z-10">
          <Navbar/>
          <Intro/>
        </div>
        <Slider/>
        <Resumo/>
        <div className="bg-black text-white font-extrabold flex justify-center items-center text-lg md:text-xl italic">
        <p>VirtualVegas © 2024. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Inicio