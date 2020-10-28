import News from '../schemas/News';

export default {
  render(news: News) {
    return {
      id: news.id,
      title: news.title,
      description: news.description,
      url_image: `http://localhost:3333/images/${news.image}`,
      created_at: news.created_at,
    };
  },

  renderMany(news: News[]) {
    return news.map(item => this.render(item));
  },
};
