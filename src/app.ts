import express, { NextFunction, Request, Response } from 'express';

import config from './config';
import initDB from './config/DB';
import logger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();


// initializing DB
initDB();

//logger middleware

// parser
app.use(express.json());
// app.use(express.urlencoded());

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Next level WebDevelopment');
});

// user CRUD

app.use('/users', userRoutes);

// todos crud
app.use('/todos', todoRoutes);

// auth route

app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
    path: req.path,
  });
});

export default app;
