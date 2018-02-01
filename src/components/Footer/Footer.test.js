import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Footer from './Footer';

const renderer = new ShallowRenderer();

it('Footer renders without crashing', () => {
  renderer.render(<Footer />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
});
