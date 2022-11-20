import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactStrictMode, rootElement } from '../index';
import { render, screen } from '@testing-library/react';

test('renders without crashing', () => {
    ReactDOM.createRoot(rootElement).render(ReactStrictMode);
    expect(ReactDOM.createRoot(rootElement).render)
    .toHaveBeenCalledWith(ReactStrictMode);
});