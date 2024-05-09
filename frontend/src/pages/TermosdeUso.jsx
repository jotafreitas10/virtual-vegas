import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosdeUso = () => {
  return (
    <div>
      <Header title="Termos de Uso" />
      <div className="text-2xl text-justify text-black text-ellipsis  md:w-full justify-between p-10">
        Estes Termos de Uso regem o uso do nosso simulador de casino virtual. Ao conectar ou utilizar o nosso simulador de cassino, concorda com estes termos. Se não concordar com algum dos termos, por favor, não utilize o nosso serviço.
        <br />
        <br />
        <span className="font-bold text-3xl">Uso Autorizado:</span>
        <br />
        <br />
        Nosso simulador de casino virtual destina-se apenas para fins de entretenimento e diversão. Concorda em não utilizar os nossos serviços para qualquer atividade ilegal ou fraudulenta.Ao utilizar o nosso simulador de casino, reconhece que não está apostando dinheiro real e que todas as vitórias e perdas são puramente virtuais.
        <br />
        <br />
        <span className="font-bold text-3xl">Propriedade Intelectual:</span>
        <br />
        <br />
        Todos os direitos autorais, marcas registradas e outros direitos de propriedade intelectual relacionados ao nosso simulador de casino virtual são de propriedade exclusiva de Virtual Vegas ou dos nossos licenciadores.Você concorda em não copiar, modificar, distribuir, transmitir, exibir, vender ou explorar qualquer parte do nosso simulador de casino sem a nossa autorização prévia por escrito.
        <br />
        <br />
        <span className="font-bold text-3xl">Limitação de Responsabilidade:</span>
        <br />
        <br />
        O nosso simulador de cassino virtual é fornecido "no estado em que se encontra", sem garantias de qualquer tipo, expressas ou implícitas.Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou da incapacidade de usar o nosso simulador de cassino.
        <br />
        <br />
        <span className="font-bold text-3xl">Disposições Gerais:</span>
        <br />
        <br />
        Estes Termos de Uso serão regidos e interpretados de acordo com as leis de Portugal.Se qualquer disposição destes Termos for considerada inválida ou inexequível, essa disposição será limitada ou eliminada na medida mínima necessária, e as disposições restantes destes Termos permanecerão em pleno vigor e efeito.
        <br />
      </div>
      <Footer />
    </div>
  );
};

export default TermosdeUso;