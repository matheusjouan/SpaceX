import { getMongoRepository } from 'typeorm';

import News from '../schemas/News';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
}

class DeleteNewssService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const newsRepository = getMongoRepository(News);

    const news = await newsRepository.findOne(id);

    if (!news) {
      throw new AppError('News does not exists');
    }

    await newsRepository.delete(news);
  }
}

export default DeleteNewssService;
