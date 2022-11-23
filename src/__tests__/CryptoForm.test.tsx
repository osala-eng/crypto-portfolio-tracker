import React from "react";
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {CryptoForm} from '../components/CryptoForm';

jest.setTimeout(20000);
const options = {
    timeout: 15000
}
describe('Test crypto form', ()=> {
    render(<CryptoForm/>)
    test('Buttons and input operations', async() => {
        const token = await waitFor
            (() => screen.findByLabelText(/Token/i), options);
        const quantity = await waitFor
            (() => screen.findByLabelText(/Qty. Owned/i), options);
        const button = await waitFor
            (() => screen.findByText(/Add Asset/i), options);

        expect(token).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        userEvent.type(token, 'bitcoin');
        userEvent.type(quantity, '2');
        userEvent.click(button);

    })
})