import { getMongoRepository } from 'typeorm';

import News from '../schemas/News';

interface RequestDTO {
  title: string;
  description: string;
  image: string;
}

class CreateNewsService {
  public async execute({
    description,
    image,
    title,
  }: RequestDTO): Promise<News> {
    const newsRepository = getMongoRepository(News);

    const news = newsRepository.create({
      image,
      title,
      description,
    });

    await newsRepository.save(news);

    return news;
  }
}

export default CreateNewsService;
