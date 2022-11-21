import { screen } from '@testing-library/react';
import React from 'react';
import ReactDOM  from 'react-dom/client';
import { act } from 'react-test-renderer';
import { rootElement, strictMode } from '../index';


describe('Index.tsx renders without errors', ()=> {
    it('Renders correctly', () => {
        act(()=>{
            const rootElm = document.createElement('div');
            ReactDOM.createRoot(rootElm).render(strictMode);
        });
        const rootApp = screen.findAllByTestId('root-app');
        expect(rootApp).toBeDefined();
    });
});