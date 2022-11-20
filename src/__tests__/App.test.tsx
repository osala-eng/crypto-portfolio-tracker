import React from 'react';
import { render, screen, cleanup} from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';

beforeEach(()=>{
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(()=>{
  cleanup();
});

test('App.tsx renders without crashing', () => {
  render(<App />);
});

test('Compare app to a snapshot', () => {
  const component = renderer.create(<App/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component.unmount();
});

test('App.tsx loading with success', () => {
  const {getByTestId} = render(<App testv={1} />);
  const loadedElm = screen.getByText(/Loading please wait/i);
  expect(loadedElm).toBeInTheDocument();
});

test('App.tsx renders Username accepted with success', () => {
  render(<App testv={2}/>);
  const loadedElm = screen.getByText(/Success, username accepted/i);
  expect(loadedElm).toBeInTheDocument();
});

test('App.tsx renders username too short with success', () => {
  render(<App testv={3}/>);
  const loadedElm = screen.getByText(/Error: Username too short/i);
  expect(loadedElm).toBeInTheDocument();
});
