import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoIosAdd, IoIosRemove } from "react-icons/io";

const PerguntasFrequentes = () => {
  const [respostasVisiveis, setRespostasVisiveis] = useState(Array(5).fill(false));

  const toggleResposta = (index) => {
    const newRespostasVisiveis = [...respostasVisiveis];
    newRespostasVisiveis[index] = !newRespostasVisiveis[index];
    setRespostasVisiveis(newRespostasVisiveis);
  };

  const perguntas = [
    "Como posso editar perfil?",
    "É possível jogar de forma gratuita, sem apostar dinheiro real?",
    "O que devo fazer se esqueci-me da minha password?",
    "Quais são os jogos disponíveis no casino?",
    "Como mudo a minha foto de perfil?"
  ];

  const respostas = [
    "Para ter acesso e editar o seu perfil, siga estas etapas simples: 1.No cabeçalho do site, localizado no canto superior direito da página, você encontrará a foto de Perfil. 2.Clique na foto de Perfil para abrir um menu suspenso. 3.No menu suspenso, selecione a opção Editar Perfil. Ao seguir essas etapas, você será direcionado para a página de edição do seu perfil, onde poderá atualizar suas informações conforme necessário. Se você tiver alguma dúvida ou precisar de assistência adicional, não hesite em entrar em contato conosco. Estamos aqui para ajudar!",
    "Sim, no VirtualVegas, oferecemos a opção de jogar gratuitamente, sem a necessidade de apostar dinheiro real. Isso permite que os jogadores experimentem os nossos jogos e se familiarizem com a plataforma sem nenhum risco financeiro. Os jogadores podem desfrutar de uma ampla variedade de jogos, explorar recursos e desenvolver as suas habilidades. É uma ótima maneira de se divertir e praticar sem preocupações financeiras.",
    "Caso tenha esquecido a sua password, não se preocupe. Para redefini-la, siga estas etapas simples: 1.Aceda ao seu perfil no casino virtual. Você pode fazer isso clicando no botão de perfil, localizado no canto superior direito da página. 2.Uma vez no seu perfil, procure a opção 'Alterar palavra-passe'. 3.Preencha esta opção para iniciar o processo de redefinição de senha. 4.Após o preenchimento bem sucedido, poderá clicar no botão aplicar. Certifique-se de escolher uma senha segura e de fácil memorização. Se precisar de mais ajuda ou encontrar algum problema durante o processo, não hesite em entrar em contato com a nossa equipe de suporte ao cliente. Estamos aqui para ajudar a garantir que você recupere o acesso à sua conta o mais rápido possível.",
    "A nossa plataforma oferece uma emocionante variedade de jogos de casino para atender a todos os gostos e preferências. Atualmente, os jogos disponíveis incluem: Roleta: Experimente a emoção da roleta com as suas diferentes variantes e opções de apostas. Teste a sua sorte e estratégia neste clássico jogo de casino. Blackjack: Desafie-se numa partida de blackjack, um jogo de cartas popular conhecido pela sua combinação de habilidade e sorte. Vença o dealer e alcance 21 para ganhar grandes prêmios. Slots: Explore uma ampla seleção de máquinas caça-níqueis com temas variados, gráficos impressionantes e recursos emocionantes. Gire os rolos e busque por combinações vencedoras para ganhar grandes jackpots.  Estes são apenas alguns dos jogos disponíveis no nosso casino virtual. Estamos constantemente adicionando novos títulos e atualizando a nossa seleção para garantir uma experiência de jogo emocionante e envolvente para todos os nossos jogadores. Não importa qual seja a sua preferência, há sempre algo emocionante esperando por si no nosso casino.",
    "Claro, aqui está um resumo simplificado das instruções: 1.No cabeçalho, clique na opção de perfil. 2.No submenu suspenso, selecione Editar Perfil. 3.Dentro da página de edição do perfil, encontre a opção para alterar a foto. 4.Faça o upload da nova foto e clique em Aplicar para salvar as alterações."
  ];

  return (
    <div>
      <Header title="Perguntas Frequentes" />
      <div className="relative font-sarabun">
        <div className="flex flex-col justify-between max-w-[1240px] text-black mx-auto mt-12 mb-12">
          {perguntas.map((pergunta, index) => (
            <div key={index} className="w-full ">
              <div className="flex justify-between mb-4  bg-zinc-300 p-4 cursor-pointer" onClick={() => toggleResposta(index)}>
                <p className="text-xl md:text-3xl">{pergunta}</p>
                {respostasVisiveis[index] ? <IoIosRemove className='w-[45px] md:w-[60px] h-[45px] md:h-[60px]'/> : <IoIosAdd className='w-[45px] md:w-[60px] h-[45px] md:h-[60px]'/>}
              </div>
              {respostasVisiveis[index] && (
                <div className={respostasVisiveis[index] ? 'p-4 text-base md:text-xl bg-zinc-300 mb-6 opacity-100 transition-opacity duration-500' : 'p-4 text-base md:text-xl bg-zinc-300 mb-6 opacity-0 transition-opacity duration-500'}>
                  <p>{respostas[index]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerguntasFrequentes;