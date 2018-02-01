import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';

storiesOf(Header.displayName, module)
  .add('default', () => <Header />)
  .add('white variation', () => <Header white />);
