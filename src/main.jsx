import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx';
import { ArticleProvider } from './context/ArticlesContext.jsx';
import React from 'react';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </AuthProvider>
  </React.StrictMode>

);
