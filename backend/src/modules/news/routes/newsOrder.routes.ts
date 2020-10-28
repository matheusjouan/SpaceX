import { Router } from 'express';

import NewsOrderController from '../controllers/NewsOrderController';

const newsOrderRoutes = Router();

const newsOrderController = new NewsOrderController();

// Retorno das últimas notícias
newsOrderRoutes.get('/', newsOrderController.index);

export default newsOrderRoutes;
