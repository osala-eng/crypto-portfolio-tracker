// src/index.js
import React from 'react';
// import { createRoot } from 'react-dom/client'
import App from './App';
import ReactDOM from 'react-dom';

import './index.css';

export const ReactStrictMode = <React.StrictMode>
  <App />
</React.StrictMode>;

export const rootElement = document.getElementById('root');

ReactDOM.render(
  ReactStrictMode,
  rootElement
);

// export const rootElement = document.getElementById('root');
// const app = createRoot(rootElement!);
// app.render(ReactStrictMode);
