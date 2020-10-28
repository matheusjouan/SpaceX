import React from 'react';

import { Switch, Route } from 'react-router-dom';

import User from '../pages/User';
import CreateUser from '../pages/CreateUser';
import CreateNews from '../pages/CreateNews';

import Dashboard from '../pages/Dashboard';
import News from '../pages/News';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/users" exact component={User} />
    <Route path="/users/create" component={CreateUser} />
    <Route path="/news" exact component={News} />
    <Route path="/news/create" component={CreateNews} />
  </Switch>
);

export default Routes;
