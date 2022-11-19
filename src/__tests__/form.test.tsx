import React from 'react';
import ReactDOM from 'react-dom';
import { rootElement } from '../index';
import { Form } from '../components/Form';
import renderer from 'react-test-renderer'

jest.mock('react-dom', () => ({ render: jest.fn() }));

const FormElm = <Form/>;
describe('Form.tsx', () => {
  it('Form renders without crashing', () =>{
    ReactDOM.render(FormElm, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(FormElm, rootElement);
    const component = renderer.create(<Form/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});