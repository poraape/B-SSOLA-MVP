import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App.tsx';
import { ModelErrorBoundary } from './app/ModelErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModelErrorBoundary scope="app">
      <App />
    </ModelErrorBoundary>
  </StrictMode>,
);
