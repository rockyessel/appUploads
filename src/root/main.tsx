import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppWriteContextProvider } from '../context/app-write.tsx';
import { ThemeContextProvider } from '../context/theme.tsx';
import { inject } from '@vercel/analytics';

inject();

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <AppWriteContextProvider>
      <ThemeContextProvider>
        <Router>
          <App />
        </Router>
      </ThemeContextProvider>
    </AppWriteContextProvider>
  </React.StrictMode>
);
