import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import Preloader from './Shared/Preloader/Preloader';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

const helmetContext = {}; // Define helmetContext here

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <HelmetProvider context={helmetContext}>
          <Preloader />
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
