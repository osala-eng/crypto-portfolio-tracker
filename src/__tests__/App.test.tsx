import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';

test('App.tsx renders without crashing', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('Compare app to a snapshot', () => {
  const component = renderer.create(<App/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
