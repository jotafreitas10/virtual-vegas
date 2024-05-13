import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import openai from 'openai';
import openaiRoutes from './routes/openaiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userStatsRoutes from './routes/userStatsRoutes.js';
import siteStatsRoutes from './routes/siteStatsRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/users', userRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user/stats', userStatsRoutes);
app.use('/api/site/stats', siteStatsRoutes);
app.use('/api/comments', commentRoutes);

/*if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
*/
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));

