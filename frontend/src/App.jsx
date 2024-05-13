import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Inicio from './pages/Inicio';
import Home from './pages/Home';
import Jogos from './pages/Jogos';
import Blackjack from './pages/Blackjack';
import Slots from './pages/Slots';
import Roleta from './pages/Roleta';
import EditProfile from './pages/EditProfile';
import AdmPanel from './pages/PainelAdmin';
import PoliticadePrivacidade from './pages/PoliticadePrivacidade';
import TermosdeUso from './pages/TermosdeUso';
import Sobre from './pages/Sobre';
import Suporte from './pages/Suporte';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AssistenteVirtual from './pages/AssistenteVirtual';
import PerguntasFrequentes from './pages/PerguntasFrequentes';
import Definicoes from './pages/Definicoes';
import { ToastContainer } from  "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {userInfo} = useSelector((state)=>state.auth);
  return (
      <div>
        <Routes>
          {/* Rotas públicas */}
          <Route path="" element={<Inicio/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="reset-password" element={<ResetPassword/>} />
          {/* Rotas privadas para utilizadores autenticados */}
          <Route path='' element={<PrivateRoute/>}>
            <Route path="home" element={<Home />}/>
            <Route path="jogos" element={<Jogos/>}/>
            <Route path={`/${userInfo?.username}/editar-perfil`} element={<EditProfile/>}/>
            <Route path="politicadeprivacidade" element={<PoliticadePrivacidade/>}/>
            <Route path="sobre" element={<Sobre/>}/>
            <Route path="termosdeuso" element={<TermosdeUso/>}/>
            <Route path="suporte" element={<Suporte/>}/>
            <Route path="jogos/blackjack" element={<Blackjack/>}/>
            <Route path="jogos/roleta" element={<Roleta/>}/>
            <Route path="jogos/slots" element={<Slots/>}/>
            <Route path='suporte/assistentevirtual' element={<AssistenteVirtual/>}/>
            <Route path='suporte/perguntasfrequentes' element={<PerguntasFrequentes/>}/>
            <Route path='definicoes' element={<Definicoes/>}/>
          </Route>
          <Route path='' element={<AdminRoute/>}>
            <Route path='adminpanel' element={<AdmPanel/>}/>
          </Route>
        </Routes>
        <ToastContainer position='top-left' autoClose={4000} rtl={false} newestOnTop={true} closeOnClick pauseOnFocusLoss theme='dark' />
      </div>
  );
}

export default App;