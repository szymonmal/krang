import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from './Header';

const renderer = new ShallowRenderer();

it('Header renders without crashing', () => {
  renderer.render(<Header />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('header');
});
