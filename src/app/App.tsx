import { FC } from 'react';
import { Header } from '@/widgets/Header';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router';
import PrivateRouter from './router/PrivateRouter';
import { NewEditArticlePage } from '@/pages/NewArticle';
import { ProfilePage } from '@/pages/Profile';
import { ArticlesPage } from '@/pages/Articles';
import { SignInPage } from '@/pages/SignIn';
import { ArticlePage } from '@/pages/Article';
import { SignUpPage } from '@/pages/SignUp';
import { useAppSelector } from './store/hooks';

const App: FC = () => {
  const isAuth = !!useAppSelector((state) => state.userSlice.token);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Header />
              <main className="app__content">
                <div className="app__container">
                  <Outlet />
                </div>
              </main>
            </div>
          }
        >
          <Route
            element={
              <PrivateRouter isAllowed={isAuth} redirectPath="sign-in" />
            }
          >
            <Route path="new-article" element={<NewEditArticlePage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route
              path="articles/:slug/edit"
              element={<NewEditArticlePage />}
            />
          </Route>

          <Route index element={<ArticlesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />

          <Route
            path="sign-in"
            element={isAuth ? <Navigate to="/" replace /> : <SignInPage />}
          />
          <Route
            path="sign-up"
            element={isAuth ? <Navigate to="/" replace /> : <SignUpPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
