import User from '../schemas/User';

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      country: user.country,
      state: user.state,
      city: user.city,
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  },
};
