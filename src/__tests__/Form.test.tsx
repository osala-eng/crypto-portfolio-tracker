import React from 'react';
import { Form } from '../components/Form';
import renderer from 'react-test-renderer';
import {SubmitSuccess, SubmitError, Waiting} from '../components/Messages'
import { render, fireEvent } from '@testing-library/react';

const fetchCall = jest.fn();
const FormElm = <Form fetchCall={fetchCall}/>;
const originalErr = console.error;
console.error = jest.fn();

test('Form matches snapshot', () => {
    const component = renderer.create(FormElm);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button and input test', () => {
    const {getByTestId, getByPlaceholderText} = render(<Form fetchCall={fetchCall} />);
    const button = getByTestId("subbtn");
    fireEvent.click(button);
    expect(fetchCall).toBeCalledTimes(1);

    const textInp = getByPlaceholderText(/username/);
    fireEvent.change(textInp);
});


test('Check snapshots for pop ups', () => {
    const component = renderer.create(<div>
        <SubmitSuccess />
        <SubmitError />
        <Waiting />
    </div>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

console.error = originalErr;
