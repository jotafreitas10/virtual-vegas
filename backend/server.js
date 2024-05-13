import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import openai from 'openai';
import openaiRoutes from './routes/openaiRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userStatsRoutes from './routes/userStatsRoutes.js';
import siteStatsRoutes from './routes/siteStatsRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

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
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));

