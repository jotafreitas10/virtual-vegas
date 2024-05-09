
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatForm from '../components/ChatAssistente'

const AssistenteVirtual = () => {
    return (
      <div>
        <div>
        <Header title="Assistente Virtual" />
        </div>
        <ChatForm/>
        <div>
        <Footer />
        </div>
        </div>
      );
    };
    
    export default AssistenteVirtual;