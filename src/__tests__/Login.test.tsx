import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import UserE from '@testing-library/user-event';
import Login from '../components/Login';
import {Route, Routes, HashRouter} from 'react-router-dom';
import Dashbord from '../pages/Dashboard';

const options = {
    timeout: 3000
}

const Element = <HashRouter>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashbord' element={<></>}/>
    </Routes>
</HashRouter>;

describe('Discover form elements and test empty input', () => {
    render(Element);
    test('Find form components and test empty form', async () => {
        const button =
        await waitFor(() => screen.findByTestId(/login-btn/i), options);
        const username =
        await waitFor(()=> screen.findByTestId(/login-user/i), options)
        const password =
        await waitFor(()=> screen.findByTestId(/login-pass/i), options)

        expect(button).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();

        UserE.type(username, 'username');
        UserE.type(password, 'Password');
        UserE.click(button);

        UserE.clear(username);
        UserE.clear(password);
        UserE.click(button);
    });
});
