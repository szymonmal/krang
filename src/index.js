/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './state/store/configureStore';

import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

require('typeface-roboto');

const store = configureStore();
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

registerServiceWorker();
