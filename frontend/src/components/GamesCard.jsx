import React from 'react'
import bjIcon from '../assets/blackjackIcon.png';
import rIcon from '../assets/rouletteIcon.png';
import sIcon from '../assets/slotIcon.png';
import { useNavigate, Link } from 'react-router-dom';

const GamesCard = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 md:hover:my-2 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-white' src={bjIcon} alt="/" />
                <h2 className='text-2xl font-bold text-center py-8'>Blackjack</h2>
                <p className='text-center text-xl font-bold'>Jogo de cartas desafiador</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Estratégia</p>
                    <p className='py-2 border-b mx-8'>Risco Calculado</p>
                    <p className='py-2 border-b mx-8'>Emoção</p>
                </div>
                <button className='bg-[#bda774] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-[#897952] transition-colors'><Link to='/jogos/blackjack'>Jogar Blackjack</Link></button>
            </div>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 md:hover:my-2 rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-white' src={rIcon} alt="/" />
                <h2 className='text-2xl font-bold text-center py-8'>Roleta</h2>
                <p className='text-center text-xl font-bold'>Roda giratória, sorte imprevisível</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Sorte</p>
                    <p className='py-2 border-b mx-8'>Vitória</p>
                    <p className='py-2 border-b mx-8'>Expetativa</p>
                </div>
                <button className='bg-[#bda774] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-[#897952] transition-colors'><Link to='/jogos/roleta'>Jogar Roleta</Link></button>
            </div>
            <div className='w-full shadow-xl flex flex-col p-4 my-4 md:hover:my-2  rounded-lg hover:scale-105 duration-300'>
                <img className='w-20 mx-auto mt-[-3rem] bg-white' src={sIcon} alt="/" />
                <h2 className='text-2xl font-bold text-center py-8'>Slots</h2>
                <p className='text-center text-xl font-bold'>Sorte nos símbolos</p>
                <div className='text-center font-medium'>
                    <p className='py-2 border-b mx-8 mt-8'>Tensão</p>
                    <p className='py-2 border-b mx-8'>Euforia</p>
                    <p className='py-2 border-b mx-8'>Adrenalina</p>
                </div>
                <button className='bg-[#bda774] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-[#897952] transition-colors'><Link to='/jogos/slots'>Jogar Slots</Link></button>
            </div>
        </div>
    </div>
  )
}

export default GamesCard