import React from 'react';
import SocialIcons from "../assets/Social Icons.png";
import SocialIcons1 from "../assets/Social Icons (1).png";
import SocialIcons2 from "../assets/Social Icons (2).png";
import SocialIcons3 from "../assets/Social Icons (3).png";
import SocialIcons4 from "../assets/Social Icons (4).png";
import SocialIcons5 from "../assets/Group 1.png";
import { useNavigate, Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className=' w-max-[1240px] mx-auto bg-[#b4b0b0] '>
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

  );
};
export default Footer;