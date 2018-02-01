import { all } from 'redux-saga/effects';

import locationsSaga from './locations';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([locationsSaga()]);
}
