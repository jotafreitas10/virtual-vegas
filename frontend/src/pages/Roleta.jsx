import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommentSection from '../components/CommentSection'


const Roleta = () => {
  return (
    <div>
      <Header title="Roleta" />
      <div>
      <iframe className='max-w-[1240px] p-6 mt-10 mb-10 mx-auto' src="https://free-slots.games/playtechslots/playtech1.php?s=RouletteDeluxe/index.html" title="Roulette Deluxe - free slot " width="640" height="480" ></iframe>
      </div>
      <div>
        <CommentSection/>
      </div>
      <Footer />
    </div>
  );
};

export default Roleta;