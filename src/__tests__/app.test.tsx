import React from 'react';
import ReactDOM from 'react-dom';
import { rootElement } from '../index';
import App from '../App';
import renderer from 'react-test-renderer';

jest.mock('react-dom', () => ({ render: jest.fn() }));

const elm = <App/>;

describe('App.tsx', ()=>{
    it('App.tsx renders without crashing', ()=>{
        ReactDOM.render(elm, rootElement);
        expect(ReactDOM.render).toHaveBeenCalledWith(elm, rootElement);

        const component = renderer.create(<App/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});