import React, { useState, useEffect, useCallback, useMemo } from 'react';

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
import ModalShowNews from '../../components/Modals/ModalsShowNews';
import ModalEditNews, {
  INewsEdit,
} from '../../components/Modals/ModalEditNews';

import api from '../../services/api';

import { Container, Content, Button, PageActions } from './styles';

interface INews {
  id: string;
  title: string;
  description: string;
  created_at: string;
  formattedData: string;
  sumaryDescription: string;
  image: File;
  url_image: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Dado da news selecionado, para ser enviado p/ modal
  const [newsItem, setNewsItem] = useState({} as INews);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalShowOpen, setModalShowOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/news', {
        params: {
          page,
        },
      });

      const newsFormatted = response.data.news.map((item: INews) => ({
        ...item,
        formattedData: new Date(item.created_at).toLocaleDateString('pt-br'),
        sumaryDescription:
          item.description.length >= 20
            ? item.description.substring(0, 20).concat('...')
            : item.description,
      }));

      setNews(newsFormatted);
      setTotal(response.data.total);
    }
    loadData();
  }, [page]);

  // Fazer a tratativa de erro
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/news/${id}`);

        setNews(news.filter(item => item.id !== id));

        // Vai para página anterior (sem registro na atual)
        if (news.length === 1) {
          if (page !== 1) setPage(page - 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [news, page],
  );

  const handlePage = useCallback(
    async (action: string) => {
      let nextPage = page;

      if (action === 'next') {
        nextPage = page + 1;
      } else {
        nextPage = page - 1;
      }

      const response = await api.get(`/news`, {
        params: {
          page: nextPage,
        },
      });

      setPage(nextPage);
      setNews(response.data.news);
    },
    [page],
  );

  const toggleEditModal = useCallback(() => {
    setModalEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  const setEditNews = useCallback(
    data => {
      toggleEditModal();
      setNewsItem(data);
    },
    [toggleEditModal],
  );

  const handleEditForm = useCallback(
    async (item: INewsEdit) => {
      try {
        const dataFormData = new FormData();

        dataFormData.append('description', item.description);
        dataFormData.append('title', item.title);
        dataFormData.append('image', item.image);

        const response = await api.put(`/news/${item.id}`, dataFormData);

        setNews(news.map(n => (n.id === item.id ? response.data : n)));
        refreshPage();
      } catch (err) {
        console.log(err);
      }
    },
    [news],
  );

  const toggleShowModal = useCallback(() => {
    setModalShowOpen(!modalShowOpen);
  }, [modalShowOpen]);

  const setShowNews = useCallback(
    data => {
      toggleShowModal();
      setNewsItem(data);
    },
    [toggleShowModal],
  );

  const refreshPage = useCallback(async () => {
    const response = await api.get('/news', {
      params: {
        page,
      },
    });

    const newsFormatted = response.data.news.map((item: INews) => ({
      ...item,
      formattedData: new Date(item.created_at).toLocaleDateString('pt-br'),
      sumaryDescription:
        item.description.length >= 20
          ? item.description.substring(0, 20).concat('...')
          : item.description,
    }));

    setNews(newsFormatted);
    setTotal(response.data.total);
  }, [page]);

  return (
    <Container>
      <Sidebar />

      <Content>
        <section>
          <h1>Notícias</h1>
          <div className="addNews">
            <Link to="/news/create">
              <FiUserPlus size={18} />
              Cadastrar Notícias
            </Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {news.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.sumaryDescription}</td>
                  <td>{item.formattedData}</td>
                  <td>
                    <Button className="info" onClick={() => setShowNews(item)}>
                      <FiEye />
                    </Button>

                    <Button className="edit" onClick={() => setEditNews(item)}>
                      <FiEdit />
                    </Button>

                    <Button
                      className="trash"
                      onClick={() => handleDelete(item.id)}
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

      <ModalShowNews
        isOpen={modalShowOpen}
        setIsOpen={toggleShowModal}
        newsData={newsItem}
      />

      <ModalEditNews
        isOpen={modalEditOpen}
        setIsOpen={toggleEditModal}
        newsData={newsItem}
        handleEditForm={handleEditForm}
      />
    </Container>
  );
};

export default News;
