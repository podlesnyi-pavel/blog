import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import App from './App.tsx';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error('Root not found');
}
