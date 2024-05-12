import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blackjack = () => {
  return (
    <div>
      <Header title="Blackjack" />
      <div>
          <iframe className='max-w-[1240px] mx-auto' src="https://free-slots.games/playtechslots/playtech1.php?s=BusterBlackJack/index.html" title="Buster Blackjack - free slot " width="640" height="480" ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Blackjack;