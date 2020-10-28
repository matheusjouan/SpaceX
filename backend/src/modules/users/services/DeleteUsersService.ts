import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
}

class DeleteUsersService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const usersRepository = getMongoRepository(User);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await usersRepository.delete(user);

    return;
  }
}

export default DeleteUsersService;
