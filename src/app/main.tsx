import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';

import ArticlesPage from '@/pages/ArticlesPage';
import ArticlePage from '@/pages/ArticlePage';
import App from '@/app/App';
import { store } from '@/app/store/store';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<ArticlesPage />} />
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="articles/:slug" element={<ArticlePage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Root not found');
}
