import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(sagaMiddleware)
    : composeWithDevTools(applyMiddleware(sagaMiddleware));

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, middlewares);

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
