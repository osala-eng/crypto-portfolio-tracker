import React from 'react';
import {assets} from '../data/mockdata';
import { Table } from '../components/Table';
import {render, screen, waitFor} from '@testing-library/react';

jest.setTimeout(10000);
describe('Test Dashboard table using mock data', ()=>{
    render(<Table assets={assets}/>);
    test('Test the table components', async ()=> {
        const token = await waitFor(()=>
            screen.findByText(/Token/i));
        const quantity = await waitFor(()=>
            screen.findByText(/Qty. Owned/i));
        const ethereum = await waitFor(()=>
            screen.findByText(/ethereum/i));
        const bitcoin = await waitFor(()=>
            screen.findByText(/bitcoin/i));

        expect(token).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(ethereum).toBeInTheDocument();
        expect(bitcoin).toBeInTheDocument();
    })
})
