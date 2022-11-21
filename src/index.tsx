import React from 'react';
import DOM from 'react-dom/client';
import './index.css';
import App from './App';

export const rootElement = document.getElementById('root') as HTMLElement ||
document.createElement('div');

export const strictMode =
<React.StrictMode>
    <App data-testid = 'root-app' />
</React.StrictMode>;

DOM.createRoot(rootElement)?.render(strictMode);
