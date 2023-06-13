import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppWriteContextProvider } from '../context/app-write.tsx';
import { ThemeContextProvider } from '../context/theme.tsx';
import { inject } from '@vercel/analytics';

inject(); // Injects the Vercel Analytics script

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    {/* Wrapping the App component with the AppWriteContextProvider to provide write access to the app */}
    <AppWriteContextProvider>
      {/* Wrapping the App component with the ThemeContextProvider to provide theme-related context */}
      <ThemeContextProvider>
        {/* Setting up the React Router for client-side routing */}
        <Router>
          <App /> {/* The main component of the application */}
        </Router>
      </ThemeContextProvider>
    </AppWriteContextProvider>
  </React.StrictMode>
);
