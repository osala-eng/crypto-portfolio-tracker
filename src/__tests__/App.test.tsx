import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Private from '../pages/Private';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Dashbord from '../pages/Dashboard';

const func = jest.fn();

test('All snapshots match tree', () => {
    const element = renderer.create(<App />);
    const tree = element.toJSON();
    expect(tree).toMatchSnapshot();
});

const RoutedElm = <HashRouter>
    <Routes>
        <Route path='/' element={
            <Private access={true}>
                <Dashbord/>
            </Private>
        }/>
    </Routes>
</HashRouter>;

describe('Test private render', ()=>{
    test('Compare snapshot', () => {
        const element = renderer.create(RoutedElm);
        const tree = element.toJSON();
        expect(element).toMatchSnapshot();
    });
});
