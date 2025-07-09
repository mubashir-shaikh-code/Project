import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/home'
import AdminPanel from './components/AdminPanel';
import './index.css'
import App from './App.jsx'
import './style.css'

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/admin' ? <AdminPanel /> : <Home />}
  </React.StrictMode>
);
