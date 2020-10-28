import { getMongoRepository } from 'typeorm';

import News from '../schemas/News';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
}

class ShowNewssService {
  public async execute({ id }: RequestDTO): Promise<News> {
    const newssRepository = getMongoRepository(News);

    const news = await newssRepository.findOne(id);

    if (!news) {
      throw new AppError('News does not exists');
    }

    return news;
  }
}

export default ShowNewssService;
