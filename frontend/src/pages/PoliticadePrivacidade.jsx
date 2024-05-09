import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PoliticadePrivacidade = () => {
    return (
      <div>
        <Header title="Política de Privacidade" />
        <div className="text-2xl text-justify text-black text-ellipsis  md:w-full justify-between p-10">
      Esta Política de Privacidade descreve como nós, Virtual Vegas, recolhemos,
      usamos e protegemos as informações pessoais que fornece ao utilizar o
      nosso simulador de casino virtual. Ao utilizar os nossos serviços,
      concorda com a recolha e o uso de informações de acordo com esta política.
      <br />
      <br />
      <span className="font-bold text-3xl">Informações Recolhidas:</span>
      <br />
      <br />
      Para fornecer uma experiência personalizada e garantir a funcionalidade
      dos nossos serviços, podemos recolher informações pessoais, como nome,
      endereço de e-mail e outras informações de perfil que nos forneça
      voluntariamente.Também podemos recolher automaticamente informações sobre
      o seu dispositivo e a sua atividade no nosso simulador de casino,
      incluindo endereço IP, tipo de navegador, páginas visitadas e dados de
      uso.
      <br />
      <br />
      <span className="font-bold text-3xl">Uso das Informações:</span>
      <br />
      <br />
      As informações que coletamos são usadas para operar, manter e melhorar o
      nosso simulador de casino virtual, bem como para enviar comunicações
      relacionadas aos nossos serviços.Não compartilhamos suas informações
      pessoais com terceiros sem o seu consentimento, exceto quando necessário
      para cumprir com as leis aplicáveis ou proteger nossos direitos.
      <br />
      <br />
      <span className="font-bold text-3xl">Segurança das Informações:</span>
      <br />
      <br />
      Empregamos medidas de segurança para proteger suas informações pessoais
      contra acesso não autorizado, uso indevido ou divulgação.No entanto, é
      importante ressaltar que nenhum método de transmissão pela internet ou
      armazenamento eletrônico é 100% seguro, e não podemos garantir a segurança
      absoluta das informações que você nos fornece.
      <br />
      <br />
      <span className="font-bold text-3xl">Alterações nesta Política:</span>
      <br />
      <br />
      Podemos atualizar esta Política de Privacidade periodicamente, e qualquer
      alteração será publicada nesta página.Recomendamos que você revise esta
      Política regularmente para estar ciente de quaisquer alterações.
      <br />
    </div>
        <Footer />
      </div>
    );
  };
  
  export default PoliticadePrivacidade;