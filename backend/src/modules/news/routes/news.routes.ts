import { Router } from 'express';

import multer from 'multer';
import multerConfig from '../../../config/upload';

import NewsController from '../controllers/NewsController';

const newsRoutes = Router();

const upload = multer(multerConfig);

const newsController = new NewsController();

newsRoutes.get('/', newsController.index);
newsRoutes.post('/', upload.single('image'), newsController.create);
newsRoutes.get('/:id', newsController.show);
newsRoutes.put('/:id', upload.single('image'), newsController.update);
newsRoutes.delete('/:id', newsController.delete);

export default newsRoutes;
