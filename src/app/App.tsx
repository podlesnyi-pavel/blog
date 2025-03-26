import { FC } from 'react';
import Header from '@/widgets/Header/Header';
import { Outlet } from 'react-router';

const App: FC = () => {
  return (
    <div>
      <Header />
      <div className="app">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
