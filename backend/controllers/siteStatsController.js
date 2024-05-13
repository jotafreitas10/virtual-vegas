import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Estatisticas gerais do site
// @route   GET /api/site/stats
// @access  Private
const getSiteStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();


  const users = await User.find();
  const gameStats = users.map(user => user.gameStats).flat();
  const gameCountMap = new Map();

  gameStats.forEach(game => {
      const count = gameCountMap.get(game.gameName) || 0;
      gameCountMap.set(game.gameName, count + 1);
  });

  let mostPlayedGame = '';
  let maxCount = 0;
  for (const [gameName, count] of gameCountMap.entries()) {
      if (count > maxCount) {
          mostPlayedGame = gameName;
          maxCount = count;
      }
  }

  res.status(200).json({ totalUsers, mostPlayedGame });
});

export { getSiteStats };