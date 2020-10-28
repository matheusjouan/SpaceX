import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyles from './styles/globalStyles';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
