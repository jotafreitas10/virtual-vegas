import asyncHandler from 'express-async-handler';
import SiteStats from '../models/siteStatsModel.js';

// Controlador para recuperar estatísticas gerais do site
const getSiteStats = asyncHandler(async (req, res) => {
  const siteStats = await SiteStats.findOne();
  res.json(siteStats);
});

// Controlador para atualizar estatísticas gerais do site
const updateSiteStats = asyncHandler(async (req, res) => {
  const { newStats } = req.body;
  let siteStats = await SiteStats.findOne();

  // Se não houver estatísticas no banco de dados, cria um novo documento de estatísticas
  if (!siteStats) {
    siteStats = new SiteStats(newStats);
  } else {
    // Atualiza as estatísticas existentes
    siteStats = Object.assign(siteStats, newStats);
  }

  await siteStats.save();
  res.status(200).json({ message: 'Estatísticas gerais do site atualizadas com sucesso' });
});

export { getSiteStats, updateSiteStats };