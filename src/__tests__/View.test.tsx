import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import View from '../components/View/View';

const renderer = new ShallowRenderer();
renderer.render(<View />);
const result = renderer.getRenderOutput();


afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
})

test('renders learn react link', () => {
  render(<View />);
});


expect(result.type).toBe('div');

