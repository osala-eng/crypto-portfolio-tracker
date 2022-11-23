import React, { useEffect } from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Private from '../pages/Private';
import {HashRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Dashbord from '../pages/Dashboard';


const func = jest.fn();

test('All snapshots match tree', () => {
    const element = renderer.create(<App />);
    const tree = element.toJSON();
    expect(tree).toMatchSnapshot();
});

const TestRoot = ()=>{
    const navigate = useNavigate();
    return(
        <div>
            <button onClick={()=>{navigate('/test1')}}>Test1</button>
            <button onClick={()=>{navigate('/test0')}}>Test0</button>
        </div>
    )
}

const RoutedElm0 = <HashRouter>
    <Routes>
        <Route path='/' element={
            <Private access={true}>
                <Dashbord  user='JohnW'/>
            </Private>
        }/>
    </Routes>
</HashRouter>;

describe('Test private render 1', ()=>{
    test('Compare snapshot 1', () => {
        const element = renderer.create(RoutedElm0);
        const tree = element.toJSON();
        expect(element).toMatchSnapshot();
    });
});



const RoutedElm1 = <HashRouter>
    <Routes>
        <Route path='/' element = {
            <Private>
                <></>
            </Private>
        }/>
    </Routes>
</HashRouter>;

describe('Test private render  2', ()=>{
    test('Compare snapshot 2', () => {
        const element = renderer.create(RoutedElm1);
        const tree = element.toJSON();
        expect(element).toMatchSnapshot();
    });
});
