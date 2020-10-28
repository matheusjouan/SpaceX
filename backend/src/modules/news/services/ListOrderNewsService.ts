import { getMongoRepository } from 'typeorm';

import News from '../schemas/News';

interface Data {
  news: News[];
  total: number;
}

class ListOrderNewsService {
  public async execute(): Promise<Data> {
    const newsRepository = getMongoRepository(News);

    const [news, count] = await newsRepository.findAndCount({
      take: 9,
      order: {
        created_at: 'DESC',
      },
    });

    return {
      news,
      total: count,
    };
  }
}

export default ListOrderNewsService;
