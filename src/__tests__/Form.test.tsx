import React from 'react';
import { Form } from '../components/Form';
import renderer from 'react-test-renderer';
import {SubmitSuccess, SubmitError, Waiting} from '../components/Messages'
import { render, screen } from '@testing-library/react';

const fetchCall = jest.fn();
const FormElm = <Form fetchCall={fetchCall}/>;

test('Form matches snapshot', () => {
    const component = renderer.create(FormElm);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
test('Button test', () => {
    render(<Form fetchCall={fetchCall} />);
    const text = 'a'
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