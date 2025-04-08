import { FC } from 'react';
import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router';

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <div className="app__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default App;
