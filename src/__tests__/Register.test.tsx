import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import UserE from '@testing-library/user-event';
import Register from '../components/Register';


afterEach(()=>{
    cleanup();
})

describe('Discover form elements and test empty input', () => {
    render(<Register />);
    test('Find form components and test empty form', async () => {
        const button =
        await waitFor(() => screen.findByText(/Signup/i));
        const username =
        await waitFor(()=> screen.findByLabelText(/username/i))
        const password =
        await waitFor(()=> screen.findByLabelText(/password/i))
        const email =
        await waitFor(()=> screen.findByLabelText(/email/i))

        expect(button).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();

        UserE.paste(username, 'username');
        UserE.paste(password, 'PaSSworD');
        UserE.paste(email, 'mail@user.com');
        UserE.click(button);

        UserE.clear(username);
        UserE.clear(password);
        UserE.clear(email);
        UserE.click(button);
    });
})
