import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';

interface Data {
  users: User[];
  total: number;
}

class ListUsersService {
  public async execute(page: number): Promise<Data> {
    const usersRepository = getMongoRepository(User);

    const [users, count] = await usersRepository.findAndCount({
      skip: 10 * page - 10,
      take: 10,
    });

    return {
      users,
      total: count,
    };
  }
}

export default ListUsersService;
