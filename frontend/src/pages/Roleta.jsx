import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Roleta = () => {
  return (
    <div>
      <Header title="Roleta" />
      <div>
      <iframe className='max-w-[1240px] mx-auto' src="https://free-slots.games/games/reel_slots/3r_cool/index.html" title="Cool 777 - free slot " width="640" height="480" ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Roleta;