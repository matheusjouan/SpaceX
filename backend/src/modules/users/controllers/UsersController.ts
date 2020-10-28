import { Request, Response } from 'express';

import * as Yup from 'yup';

import UsersView from '../views/users.view';

import CreateUsersService from '../services/CreateUsersService';
import ListUsersService from '../services/ListUsersService';
import ShowUsersService from '../services/ShowUsersService';
import UpdateUsersService from '../services/UpdateUsersService';
import DeleteUsersService from '../services/DeleteUsersService';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { firstName, surname, email, cpf, country, city, state } = req.body;

    const data = {
      firstName,
      surname,
      email,
      cpf,
      country,
      city,
      state,
    };

    const schema = Yup.object().shape({
      firstName: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      email: Yup.string().email('Invalid e-mail').required('Email is required'),
      cpf: Yup.string().required('Document is required'),
      country: Yup.string().required('Country is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
    });

    await schema.validate(data, {
      abortEarly: true,
    });

    const createUsers = new CreateUsersService();

    const user = await createUsers.execute(data);

    return res.status(201).json(user);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query;

    const listUsers = new ListUsersService();
    const usersList = await listUsers.execute(Number(page));

    const users = usersList.users;
    const total = usersList.total;

    return res.status(200).json({ users: UsersView.renderMany(users), total });
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUsers = new ShowUsersService();
    const user = await showUsers.execute({ id });

    return res.status(200).json(UsersView.render(user));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { firstName, surname, email, cpf, country, city, state } = req.body;
    const { id } = req.params;

    const updateUsers = new UpdateUsersService();
    const user = await updateUsers.execute({
      id,
      city,
      country,
      cpf,
      email,
      firstName,
      surname,
      state,
    });

    return res.status(200).json(UsersView.render(user));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUsers = new DeleteUsersService();

    await deleteUsers.execute({ id });

    return res.status(204).send();
  }
}

export default UserController;
