import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HomeNavbar from '../components/HomeNavbar';
import SlotImg from '../assets/SlotFlutuante.png';
import EffectImg1 from '../assets/efeito1.png';
import EffectImg2 from '../assets/efeito2.png';
import sobrenos from '../assets/sobrenos.png';
import { useNavigate, Link } from 'react-router-dom';
import GamesCard from '../components/GamesCard';
import SocialIcons from "../assets/Social Icons.png";
import SocialIcons1 from "../assets/Social Icons (1).png";
import SocialIcons2 from "../assets/Social Icons (2).png";
import SocialIcons3 from "../assets/Social Icons (3).png";
import SocialIcons4 from "../assets/Social Icons (4).png";
import SocialIcons5 from "../assets/Group 1.png";


const Home = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const container = document.getElementById("container");
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const deltaX = (clientX - centerX) / 50;
    const deltaY = (clientY - centerY) / 50;
    setOffsetX(deltaX);
    setOffsetY(deltaY);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#DEC489] via-[#F6E0A4] to-[#D1B372]" id="container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <HomeNavbar />
        <div className="flex justify-between max-w-[1240px] mx-auto px-6 py-10 font-sarabun">
          <div className="w-[40%] mr-4">
            <p className='text-md font-extrabold text-[#F6E0A4] stroke-[10px] stroke-black'>BEM-VINDO</p>
            <h1 className="text-3xl font-extrabold mb-4">O CASINO VIRTUAL DOS SEUS SONHOS!</h1>
            <p className="text-lg font-light hidden md:block mb-4" id='username'>
              É ótimo vê-lo novamente, {userInfo.username}! Experimente a emoção de Vegas, onde quer que esteja no VirtualVegas
            </p>
            <button className="hover:bg-[#7e704d] bg-[#bda774] text-white font-bold py-2 px-4 transition-colors duration-300"><Link to='/sobre'>Saiba mais</Link></button>
          </div>
          <div className="w-[60%] ml-4 relative">
            <img src={EffectImg2} alt="Efeito 2" className="absolute top-0 left-0 w-full sm:h-full" style={{ transform: `translate(${-offsetX}px, ${-offsetY}px)` }} />
            <img src={SlotImg} alt="Imagem" className="w-full" style={{ animation: 'float 3s infinite alternate ease-in-out' }} />
            <img src={EffectImg1} alt="Efeito 1" className="absolute top-0 left-0 w-full" style={{ transform: `translate(${offsetX}px, ${offsetY}px)`, filter: 'blur(2px)' }} />
          </div>
        </div>
      </div>
      <div className='relative max-w-[1240px] mx-auto text-center'>
        <p className=' p-4 text-orange-300 text-xl md:text-2xl font-extrabold font-sarabun'>JOGAR</p>
        <h2 className='font-bold text-3xl md:text-5xl'>Os melhores jogos da atualidade</h2>
      </div>
      <div>
        <GamesCard />
      </div>

      <div className="flex justify-between max-w-[1240px] mx-auto px-6 py-10 font-sarabun">
        <div className="w-[60%] mr-4 relative">
          <img src={sobrenos} alt="Sobre Nos" className="absolute  h-full" />
        </div>
        <div className="w-[40%] ml-4">
          <p className='text-md font-extrabold text-[#F6E0A4] stroke-[10px] stroke-black uppercase'>Sobre Nós</p>
          <h1 className="text-3xl font-extrabold mb-4">Porquê um Casino Virtual?!</h1>
          <p className="text-lg font-light hidden md:block mb-4">
            Optamos por criar um simulador de casino virtual para oferecer entretenimento acessível e sem riscos financeiros. Reconhecemos a necessidade de uma plataforma onde os jogadores pudessem desfrutar da emoção dos jogos de cassino sem a pressão de apostar dinheiro real. Nosso objetivo é proporcionar diversão e relaxamento a todos os jogadores, garantindo uma experiência segura e responsável.
          </p>
          <button className="hover:bg-[#7e704d] bg-[#bda774] text-white font-bold py-2 px-4 transition-colors duration-300"><Link to='/sobre'>Sobre</Link></button>
        </div>

      </div>
      <div className=' w-max-[1240px] mx-auto bg-[#bda774] '>
        <div className='flex items-center flex-col text-black'>
          <div className='items-start flex flex-col md:flex-row justify-between w-full md:max-w-[1240px] mb-4 mt-12'>
            <div className='flex justify-center items-center w-full md:w-[35%]'>
              <p className='text-lg md:text-5xl font-extrabold text-black'>
                O dinheiro é virtual, a diversão é real
              </p>
            </div>
            <div className='flex flex-col justify-center items-center w-full md:w-[25%]'>
              <p className='ml-0 md:ml-2 mt-4 md:mt-0 text-lg md:text-xl font-extrabold text-black'>Redes Sociais</p>
              <div className="flex flex-col w-[30%] md:w-[60%] p-1 md:p-2 ">
                <div className="flex justify-between my-2 md:my-4">
                  <img src={SocialIcons} alt="Rede Social 1" className="w-6 h-6 md:w-8 md:h-8" />
                  <img src={SocialIcons1} alt="Rede Social 2" className="w-6 h-6 md:w-8 md:h-8" />
                  <img src={SocialIcons2} alt="Rede Social 3" className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="flex justify-between mt-1 md:mt-2">
                  <img src={SocialIcons3} alt="Rede Social 4" className="w-6 h-6 md:w-8 md:h-8" />
                  <img src={SocialIcons4} alt="Rede Social 5" className="w-6 h-6 md:w-8 md:h-8" />
                  <img src={SocialIcons5} alt="Rede Social 6" className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full md:w-[30%] h-full mr-2'>
              <p className='ml-0 md:ml-2 mt-4 md:mt-0 text-lg md:text-xl font-extrabold text-black'>A Nossa Equipa</p>
              <div className="flex flex-col  justify-center items-center text-sm md:text-xl font-light w-full p-1 md:p-2 my-1 md:my-4">
                <p>David França 2119422</p>
                <p className='mt-3 md:mt-6'>João Freitas 2121522</p>
              </div>
            </div>
          </div>
          <div className='flex w-full md:max-w-[1240px] justify-between border-double border-t-[5px] border-black'>
            <div>
              <ul className="flex ">
                <li className="md:p-3 p-2 text-sm md:text-base"><Link to='/politicadeprivacidade'>Política de Privacidade</Link></li>
                <li className="ml-3 md:p-3 p-2 text-sm md:text-base"><Link to='/termosdeuso'>Termos de Uso</Link></li>
              </ul>
            </div>
            <div className="md:p-3 p-2 text-sm md:text-base">VirtualVegas © 2024. Todos os direitos reservados.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;