/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const ReactStrictMode =
<React.StrictMode>
    <App/>
</React.StrictMode>;

const rootElement =
document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(ReactStrictMode);
