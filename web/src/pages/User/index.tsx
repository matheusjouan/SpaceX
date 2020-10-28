import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

import {
  FiTrash2,
  FiEye,
  FiEdit,
  FiChevronsLeft,
  FiChevronsRight,
  FiUserPlus,
} from 'react-icons/fi';

import Sidebar from '../../components/Sidebar';

import ModalEditUser, {
  IUserEditData,
} from '../../components/Modals/ModalEditUser';

import ModalShowUser from '../../components/Modals/ModalShowUser';

import api from '../../services/api';

import { Container, Content, Button, PageActions } from './styles';

interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Dado do usuário selecionado, para ser enviado p/ modal
  const [userProfile, setUserProfile] = useState({} as IUser);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalShowOpen, setModalShowOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/users', {
        params: {
          page,
        },
      });

      setUsers(response.data.users);
      setTotal(response.data.total);
    }
    loadData();
  }, [page]);

  // Fazer a tratativa de erro
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/users/${id}`);

        setUsers(users.filter(user => user.id !== id));

        // Vai para página anterior (sem registro na atual)
        if (users.length === 1) {
          if (page !== 1) setPage(page - 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [users, page],
  );

  const handlePage = useCallback(
    async (action: string) => {
      let nextPage = page;

      if (action === 'next') {
        nextPage = page + 1;
      } else {
        nextPage = page - 1;
      }

      const response = await api.get(`/users`, {
        params: {
          page: nextPage,
        },
      });

      setPage(nextPage);
      setUsers(response.data.users);
    },
    [page],
  );

  const toggleEditModal = useCallback(() => {
    setModalEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  const setEditUser = useCallback(
    data => {
      toggleEditModal();
      setUserProfile(data);
    },
    [toggleEditModal],
  );

  const toggleShowModal = useCallback(() => {
    setModalShowOpen(!modalShowOpen);
  }, [modalShowOpen]);

  const setShowUser = useCallback(
    data => {
      toggleShowModal();
      setUserProfile(data);
    },
    [toggleShowModal],
  );

  const handleEditForm = useCallback(
    async (item: IUserEditData) => {
      try {
        const response = await api.put(`/users/${item.id}`, item);
        setUsers(users.map(usr => (usr.id === item.id ? response.data : usr)));
      } catch (err) {
        console.log(err);
      }
    },
    [users],
  );

  return (
    <Container>
      <Sidebar />
      <Content>
        <section>
          <h1>Usuários</h1>
          <div className="addUser">
            <Link to="/users/create">
              <FiUserPlus size={18} />
              Cadastrar Usuário
            </Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>
                  <td>
                    <Button className="info" onClick={() => setShowUser(user)}>
                      <FiEye />
                    </Button>

                    <Button className="edit" onClick={() => setEditUser(user)}>
                      <FiEdit />
                    </Button>

                    <Button
                      className="trash"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PageActions>
            <button
              type="button"
              onClick={() => handlePage('back')}
              disabled={page <= 1}
            >
              <FiChevronsLeft size={20} color="#389cf2" />
            </button>

            <span>
              pág {page} a {total ? Math.ceil(total / 10) : 1}
            </span>

            <button
              type="button"
              onClick={() => handlePage('next')}
              disabled={page >= Math.ceil(total / 10)}
            >
              <FiChevronsRight size={20} color="#389cf2" />
            </button>
          </PageActions>
        </section>
      </Content>

      <ModalEditUser
        isOpen={modalEditOpen}
        setIsOpen={toggleEditModal}
        userData={userProfile}
        handleEditForm={handleEditForm}
      />

      <ModalShowUser
        isOpen={modalShowOpen}
        setIsOpen={toggleShowModal}
        userData={userProfile}
      />
    </Container>
  );
};

export default User;
