import { getMongoRepository } from 'typeorm';

import News from '../schemas/News';

interface Data {
  news: News[];
  total: number;
}

class ListNewssService {
  public async execute(page: number): Promise<Data> {
    const newsRepository = getMongoRepository(News);

    const [news, count] = await newsRepository.findAndCount({
      skip: 10 * page - 10,
      take: 10,
    });

    return {
      news,
      total: count,
    };
  }
}

export default ListNewssService;
