import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing Popper, necesary for dropdowns
// import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js';

// Importing bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import companyData from './companyData.json'

//Changing the title text to Company name
let firstTitleTag = document.getElementsByTagName("title")[0];
firstTitleTag.text = companyData.companyName;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
