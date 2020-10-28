import { getMongoRepository } from 'typeorm';

import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';

import News from '../schemas/News';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
  title: string;
  description: string;
  image: string;
}

class UpdateNewssService {
  public async execute({
    id,
    image,
    title,
    description,
  }: RequestDTO): Promise<News> {
    const newsRepository = getMongoRepository(News);

    const news = await newsRepository.findOne(id);

    if (!news) {
      throw new AppError('News does not exists');
    }

    // Caso alterar imagem, deletar a antiga
    if (news.image) {
      const filePath = path.resolve(uploadConfig.directory, news.image);

      try {
        await fs.promises.stat(filePath);
      } catch {
        throw new AppError('Please, try again to upload the image');
      }

      await fs.promises.unlink(filePath);
    }

    news.title = title;
    news.description = description;
    news.image = image;

    const updatedNews = await newsRepository.save(news);

    return updatedNews;
  }
}

export default UpdateNewssService;
