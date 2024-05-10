import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import openai from 'openai';
import openaiRoutes from './routes/openaiRoutes.js';
import http from 'http'; // Importe o módulo HTTP
import configureSocket from './socket.js';
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

const server = http.createServer(app); // Crie o servidor HTTP

configureSocket(server);

app.use(notFound);
app.use(errorHandler);

// Remova a chamada app.listen
// app.listen(port, () => console.log(`Server started on port ${port}`));

server.listen(port, () => console.log(`Server started on port ${port}`)); // Inicie o servidor HTTP em vez do app.listen