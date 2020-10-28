import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

import { Container, Content } from './styles';
import api from '../../services/api';

interface INews {
  id: string;
  title: string;
  url_image: string;
  description: string;
  sumaryDescription: string;
}

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/ordered-news');

      setNews(response.data.news);

      const newsFormatted = response.data.news.map((item: INews) => ({
        ...item,
        sumaryDescription:
          item.description.length >= 100
            ? item.description.substring(0, 60).concat('...')
            : item.description,
      }));

      setNews(newsFormatted);
    }

    loadData();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <section>
          <h1>Ultimas notícias</h1>

          {news.length !== 0 ? (
            <div className="list">
              {news.map((item: INews) => (
                <div className="item" key={item.id}>
                  <h2>{item.title}</h2>
                  <img src={item.url_image} alt={item.title} />
                  <p>{item.sumaryDescription}</p>

                  <button type="button">Ver mais...</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Não há notícias</p>
          )}
        </section>
      </Content>
    </Container>
  );
};

export default Dashboard;
