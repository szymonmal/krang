import { put, call, select, takeEvery } from 'redux-saga/effects';

import api from '../api';
import { locations as actions } from '../actions';
import { locations as selectors } from '../selectors';

// saga for fetching all locations from the API
export function* locationsGetAll() {
  try {
    const isFetching = yield select(selectors.getIsFetching);

    if (!isFetching) {
      yield put(actions.locationsFetchStart());

      const response = yield call(api, 'locations');

      yield put(actions.locationsFetchSucceeded(response));
    }
  } catch (error) {
    yield put(actions.locationsFetchFailed(error));
  }
}

// saga for fetching all locations from the API if state is empty or invalidated
export function* locationsGetAllIfNeeded() {
  try {
    const shouldFetch = yield select(selectors.shouldFetch);

    if (shouldFetch) {
      yield put(actions.locationsFetchStart());

      const response = yield call(api, 'locations');

      yield put(actions.locationsFetchSucceeded(response));
    }
  } catch (error) {
    yield put(actions.locationsFetchFailed(error));
  }
}

// watcher saga for locations
export default function* locationsSaga() {
  yield takeEvery(actions.LOCATIONS_GET_LOCATIONS, locationsGetAll);
  yield takeEvery(
    actions.LOCATIONS_GET_LOCATIONS_IF_NEEDED,
    locationsGetAllIfNeeded
  );
}
