import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
}

class ShowUsersService {
  public async execute({ id }: RequestDTO): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    return user;
  }
}

export default ShowUsersService;
