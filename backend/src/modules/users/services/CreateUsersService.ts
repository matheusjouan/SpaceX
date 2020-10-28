import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  firstName: string;
  surname: string;
  email: string;
  cpf: string;
  country: string;
  state: string;
  city: string;
}

class CreateUsersService {
  public async execute({
    firstName,
    surname,
    email,
    cpf,
    city,
    state,
    country,
  }: RequestDTO): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Email already exists');
    }

    const user = usersRepository.create({
      name: firstName.concat(` ${surname}`),
      email,
      cpf,
      country,
      city,
      state,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUsersService;
