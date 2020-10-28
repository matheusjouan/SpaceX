import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';

import AppError from './errors/AppErros';
import { ValidationError } from 'yup';

import uploadConfig from './config/upload';
import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Erro de validação do Yup
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validations fails',
    });
  }

  // Caso não for um erro da aplicação conhecido (AppError)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
