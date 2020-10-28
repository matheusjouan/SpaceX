import { Router } from 'express';

import usersRouter from './modules/users/routes/users.routes';
import newsRoutes from './modules/news/routes/news.routes';
import newsOrderRoutes from './modules/news/routes/newsOrder.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/news', newsRoutes);
routes.use('/ordered-news', newsOrderRoutes);

export default routes;
