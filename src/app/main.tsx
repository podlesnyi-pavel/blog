import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import { Provider } from 'react-redux';
import App from '@/app/App';
import { store } from '@/app/store/store';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Root not found');
}
