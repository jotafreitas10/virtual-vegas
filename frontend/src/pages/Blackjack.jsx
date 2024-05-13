import React from 'react';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import CommentSection from '../components/CommentSection'

const Blackjack = () => {
  useEffect(() => {
    // Função para iniciar a sessão quando a página é carregada
    const startSession = async () => {
      try {
        await axios.post('/api/user/stats/startsession', { gameName: 'Blackjack' });
        console.log('Sessão de jogo iniciada com sucesso');
      } catch (error) {
        console.error('Erro ao iniciar sessão de jogo:', error.message);
      }
    };

    startSession(); // Iniciar sessão ao carregar a página

    // Função para encerrar a sessão quando o componente é desmontado
    return async () => {
      try {
        await axios.post('/api/user/stats/endsession', { gameName: 'Blackjack' });
        console.log('Sessão de jogo encerrada com sucesso');
      } catch (error) {
        console.error('Erro ao encerrar sessão de jogo:', error.message);
      }
    };
  }, []); 
  return (
    <div>
      <Header title="Blackjack" />
      <div>
          <iframe className='max-w-[1240px] border-[10px] rounded border-[#bda777] mt-10 mb-10 mx-auto' src="https://free-slots.games/playtechslots/playtech1.php?s=BusterBlackJack/index.html" title="Buster Blackjack - free slot " width="640" height="480" ></iframe>
      </div>
      <CommentSection/>
      <Footer />
    </div>
  );
};

export default Blackjack;