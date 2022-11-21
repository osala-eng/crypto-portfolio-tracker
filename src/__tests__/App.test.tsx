import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';

test('All snapshots match tree', () => {
    const element = renderer.create(<App/>);
    const tree = element.toJSON();
    expect(tree).toMatchSnapshot();
});
