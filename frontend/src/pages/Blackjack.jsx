import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blackjack = () => {
  return (
    <div>
      <Header title="Blackjack" />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <iframe
          src="https://free-slots.games/playtechslots/PremiumBlackJackSingleHand/index.html"
          title="Premium BlackJack Single Hand - free slot"
          width="600"
          height="400"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Blackjack;