import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import UserE from '@testing-library/user-event';
import Login from '../components/Login';

const options = {
    timeout: 3000
}
describe('Discover form elements and test empty input', () => {
    render(<Login />);
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

        UserE.paste(username, 'username');
        UserE.paste(password, 'PaSSworD');
        UserE.click(button);

        UserE.clear(username);
        UserE.clear(password);
        UserE.click(button);
    });
})
