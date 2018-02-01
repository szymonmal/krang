import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Landing from './RouteLanding';

const renderer = new ShallowRenderer();

it('Landing route renders without crashing', () => {
  renderer.render(<Landing />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
});
