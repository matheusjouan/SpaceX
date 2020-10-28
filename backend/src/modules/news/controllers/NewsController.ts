import { Request, Response } from 'express';

import * as Yup from 'yup';

import newsView from '../views/news.view';

import CreateNewsService from '../services/CreateNewsService';
import DeleteNewssService from '../services/DeleteNewsService';
import ListNewssService from '../services/ListNewsService';
import ShowNewssService from '../services/ShowNewsService';
import UpdateNewssService from '../services/UpdateNewsService';

class NewsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const image = req.file.filename;

    const data = {
      title,
      description,
      image,
    };

    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    });

    await schema.validate(data, {
      abortEarly: true,
    });

    const createNews = new CreateNewsService();
    const news = await createNews.execute({ description, title, image });

    return res.status(201).json(news);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query;

    const listNews = new ListNewssService();
    const newsList = await listNews.execute(Number(page));

    const news = newsList.news;
    const total = newsList.total;

    return res.status(200).json({ news: newsView.renderMany(news), total });
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showNews = new ShowNewssService();
    const news = await showNews.execute({ id });

    return res.status(200).json(newsView.render(news));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;

    const image = req.file.filename;

    const updateNews = new UpdateNewssService();
    const news = await updateNews.execute({ description, title, image, id });

    return res.status(200).json(newsView.render(news));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteNews = new DeleteNewssService();
    await deleteNews.execute({ id });

    return res.status(204).send();
  }
}

export default NewsController;
