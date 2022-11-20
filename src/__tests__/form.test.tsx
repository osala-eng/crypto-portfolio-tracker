import React from 'react';
import ReactDOM from 'react-dom';
import { rootElement } from '../index';
import { Form } from '../components/Form';
import renderer from 'react-test-renderer';
import {backend_url} from '../utils/config';
import {SubmitSuccess, SubmitError, Waiting} from '../components/Messages'
import screen from '@testing-library/react'

jest.mock('react-dom', () => ({ render: jest.fn() }));

const FormElm = <Form fetchCall={async () =>{
  await fetch(backend_url, {
    method: 'POST',
    body: JSON.stringify({username: 'SomeName'}),
  })
}}/>;
describe('Form.tsx', () => {
  it('Form renders without crashing', () =>{
    ReactDOM.render(FormElm, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(FormElm, rootElement);
    const component = renderer.create(FormElm);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Pop ups match snapshots and render with success', () =>{
  test('Check snapshots for pop ups', ()=>{
  const component = renderer.create(<div>
    <SubmitSuccess/>
    <SubmitError/>
    <Waiting/>
  </div>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
});