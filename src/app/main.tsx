import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import App from '@/app/App';
import { store } from '@/app/store/store';

import { ArticlesPage } from '@/pages/Articles';
import { ArticlePage } from '@/pages/Article';
import { SignUpPage } from '@/pages/SignUp';
import { SignInPage } from '@/pages/SignIn';
import { ProfilePage } from '@/pages/Profile';
import { NewArticlePage } from '@/pages/NewArticle';

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
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="new-article" element={<NewArticlePage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Root not found');
}
