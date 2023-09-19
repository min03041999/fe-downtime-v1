import React from 'react';
import "./utils/font";
import "./scss/style.scss";
import App from './App';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

