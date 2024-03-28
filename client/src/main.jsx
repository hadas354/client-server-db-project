/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client'; // שימוש ב createRoot במקום render
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
