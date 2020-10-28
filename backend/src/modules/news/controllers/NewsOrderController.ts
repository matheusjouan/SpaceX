import { Request, Response } from 'express';

import newsView from '../views/news.view';
import ListOrderNewsService from '../services/ListOrderNewsService';

class NewsOrderController {
  async index(req: Request, res: Response): Promise<Response> {
    const listNews = new ListOrderNewsService();
    const newsList = await listNews.execute();

    const news = newsList.news;
    const total = newsList.total;

    return res.status(200).json({ news: newsView.renderMany(news), total });
  }
}

export default NewsOrderController;
