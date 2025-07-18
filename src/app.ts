import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app: Application = express();

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/borrow', borrowRoutes);

app.get('/health', (_req: Request, res: Response) => {
   const dbState = mongoose.connection.readyState;
   const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

   res.json({
      status: 'ok',
      dbConnection: states[dbState],
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
   });
});

export default app;
