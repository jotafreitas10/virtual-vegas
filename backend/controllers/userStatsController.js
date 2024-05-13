import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Começa uma nova sessão de jogo
// @route   POST /api/user/stats/startsession
// @access  Private
const startGameSession = asyncHandler(async (req, res) => {
  const { gameName } = req.body;
  const user = await User.findById(req.user._id);

  user.gameSessions.push({
    gameName,
    startTime: Date.now(),
    endTime: null,
  });

  await user.save();

  res.status(200).json({ message: 'Sessão de jogo iniciada com sucesso' });
});

// @desc    Controla o fim da sessão iniciada
// @route   POST /api/user/stats/endsession
// @access  Private
const endGameSession = asyncHandler(async (req, res) => {
  const { gameName } = req.body;
  const user = await User.findById(req.user._id);

  // Encontra a sessão de jogo correspondente
  const sessionIndex = user.gameSessions.findIndex(session => session.gameName === gameName && !session.endTime);

  if (sessionIndex !== -1) {
    const session = user.gameSessions[sessionIndex];
    session.endTime = Date.now();

    // Calcula a duração da sessão de jogo em minutos
    const playTime = (session.endTime - session.startTime) / (1000 * 60);

    // Atualiza o tempo total gasto no jogo específico
    const gameIndex = user.gameStats.findIndex(stat => stat.gameName === gameName);
    if (gameIndex !== -1) {
      user.gameStats[gameIndex].totalPlayTime += playTime;
    } else {
      user.gameStats.push({
        gameName,
        totalPlayTime: playTime,
        lastPlayed: Date.now(),
      });
    }

    // Atualiza o tempo total gasto jogando no geral
    user.totalPlayTime += playTime;

    await user.save();
    res.status(200).json({ message: 'Sessão de jogo encerrada com sucesso' });
  } else {
    res.status(404);
    throw new Error('Sessão de jogo não encontrada ou já encerrada');
  }
});

// @desc    Get user statistics
// @route   GET /api/user/stats
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Obtém o ID do usuário autenticado

  const user = await User.findById(userId);

  if (user) {
    let mostPlayedGame = 'Nenhum jogo jogado ainda';
    let maxPlayTime = 0;

    // Encontra o jogo com o tempo total de jogo mais alto
    user.gameStats.forEach((game) => {
      if (game.totalPlayTime > maxPlayTime) {
        mostPlayedGame = game.gameName;
        maxPlayTime = game.totalPlayTime;
      }
    });

    const userStats = {
      _id: user._id,
      totalPlayTime: user.totalPlayTime,
      mostPlayedGame,
      lastPlayedGame: user.gameStats.length > 0 ? user.gameStats[0].gameName : 'Nenhum jogo jogado ainda',
    };

    res.json(userStats);
  } else {
    res.status(404);
    throw new Error('Usuário não encontrado');
  }
});

export { startGameSession, endGameSession, getUserStats };