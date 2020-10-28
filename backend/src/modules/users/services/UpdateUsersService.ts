import { getMongoRepository } from 'typeorm';

import User from '../schemas/User';
import AppError from '../../../errors/AppErros';

interface RequestDTO {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  cpf: string;
  country: string;
  city: string;
  state: string;
}

class UpdateUsersService {
  public async execute({
    id,
    firstName,
    surname,
    email,
    city,
    country,
    cpf,
    state,
  }: RequestDTO): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const checkedEmail = await usersRepository.findOne({
      where: { email },
    });

    if (checkedEmail && checkedEmail.id.toString() !== user.id.toString()) {
      throw new AppError('Email already in user');
    }

    user.name = firstName.concat(` ${surname}`);
    user.email = email;
    user.cpf = cpf;
    user.city = city;
    user.state = state;
    user.country = country;

    const updatedUser = await usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateUsersService;
