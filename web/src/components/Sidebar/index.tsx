import React from 'react';

import { Link } from 'react-router-dom';

import { FiUser, FiHome } from 'react-icons/fi';
import { FaNewspaper } from 'react-icons/fa';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <nav>
        <div>
          <h1>SpaceX</h1>
        </div>

        <Link to="/">
          <FiHome />
          Home
        </Link>

        <Link to="/users">
          <FiUser />
          Usuários
        </Link>

        <Link to="/news">
          <FaNewspaper />
          Notícias
        </Link>
      </nav>
    </Container>
  );
};

export default Sidebar;
