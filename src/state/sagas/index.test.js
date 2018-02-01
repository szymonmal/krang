import { all } from 'redux-saga/effects';

import rootSaga from './';
import locationsSaga from './locations';

const sagaEnd = { value: undefined, done: true };

describe('Sagas - rootSaga tests', () => {
  it('should fork all sagas', () => {
    const saga = rootSaga();
    const allSagas = [locationsSaga()];

    // Saga checks locationsSaga fork
    expect(saga.next().value).toEqual(all(allSagas));

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });
});
