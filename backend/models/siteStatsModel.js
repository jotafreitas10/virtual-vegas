import mongoose from 'mongoose';

const siteStatsSchema = mongoose.Schema({
  totalUsers: { type: Number, default: 0 }, // Número total de usuários registrados
  totalGamesPlayed: { type: Number, default: 0 }, // Número total de jogos jogados em seu site
  // Outros campos para estatísticas gerais do site, como número de visualizações de página, etc.
}, { timestamps: true });

const SiteStats = mongoose.model('SiteStats', siteStatsSchema);

export default SiteStats;