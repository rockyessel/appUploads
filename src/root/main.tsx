import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppWriteContextProvider } from '../context/app-write.tsx';
import { inject } from '@vercel/analytics';

inject();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWriteContextProvider>
      <Router>
        <App />
      </Router>
    </AppWriteContextProvider>
  </React.StrictMode>
);
