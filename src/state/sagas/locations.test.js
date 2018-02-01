import { call, put, select, takeEvery } from 'redux-saga/effects';

import locationsSaga, {
  locationsGetAll,
  locationsGetAllIfNeeded
} from './locations';

import { locations as actions } from '../actions';
import api from '../api';
import { locations as selectors } from '../selectors';

const sagaEnd = { value: undefined, done: true };

describe('Sagas - locationsGetAll tests', () => {
  it('should check locations.isFetching and run an API call if value is false', () => {
    const saga = locationsGetAll();
    const response = {
      name: 'Example location',
      street: 'Example street 4',
      city: 'Example city',
      zip: '11011',
      coordinates: { lat: 123, lng: 10 },
      id: '1903190'
    };

    // Saga checks locations.isFetching value from the store
    expect(saga.next().value).toEqual(select(selectors.getIsFetching));

    // Value is false so saga puts fetchStart action
    expect(saga.next(false).value).toEqual(put(actions.locationsFetchStart()));

    // Saga runs an API call
    expect(saga.next().value).toEqual(call(api, 'locations'));

    // Saga puts fetchSucceeded action with response
    expect(saga.next(response).value).toEqual(
      put(actions.locationsFetchSucceeded(response))
    );

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });

  it('should stop if locations.isFetching=true', () => {
    const saga = locationsGetAll();

    // Saga checks locations.isFetching value from the store
    expect(saga.next().value).toEqual(select(selectors.getIsFetching));

    // Value is true so saga ends
    expect(saga.next(true)).toEqual(sagaEnd);
  });

  it('should stop if API call will end with an error', () => {
    const saga = locationsGetAll();
    const response = {
      errorText: 'Something went wrong!'
    };

    // Saga checks locations.isFetching value from the store
    expect(saga.next().value).toEqual(select(selectors.getIsFetching));

    // Value is false so saga puts fetchStart action
    expect(saga.next(false).value).toEqual(put(actions.locationsFetchStart()));

    // Saga runs an API call
    expect(saga.next().value).toEqual(call(api, 'locations'));

    // API call throws an error
    expect(saga.throw(response).value).toEqual(
      put(actions.locationsFetchFailed(response))
    );

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });
});

describe('Sagas - locationsGetAllIfNeeded tests', () => {
  it('should check locations.isFetching and run an API call if value is false', () => {
    const saga = locationsGetAllIfNeeded();
    const response = {
      name: 'Example location',
      street: 'Example street 4',
      city: 'Example city',
      zip: '11011',
      coordinates: { lat: 123, lng: 10 },
      id: '1903190'
    };

    // Saga checks result from shouldFetch selector
    expect(saga.next().value).toEqual(select(selectors.shouldFetch));

    // Value is true so saga puts fetchStart action
    expect(saga.next(true).value).toEqual(put(actions.locationsFetchStart()));

    // Saga runs an API call
    expect(saga.next().value).toEqual(call(api, 'locations'));

    // Saga puts fetchSucceeded action with response
    expect(saga.next(response).value).toEqual(
      put(actions.locationsFetchSucceeded(response))
    );

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });

  it('should stop if locations.isFetching=true', () => {
    const saga = locationsGetAllIfNeeded();

    // Saga checks result from shouldFetch selector
    expect(saga.next().value).toEqual(select(selectors.shouldFetch));

    // Value is false so saga ends
    expect(saga.next(false)).toEqual(sagaEnd);
  });

  it('should stop if API call will end with an error', () => {
    const saga = locationsGetAllIfNeeded();
    const response = {
      errorText: 'Something went wrong!'
    };

    // Saga checks result from shouldFetch selector
    expect(saga.next().value).toEqual(select(selectors.shouldFetch));

    // Value is true so saga puts fetchStart action
    expect(saga.next(true).value).toEqual(put(actions.locationsFetchStart()));

    // Saga runs an API call
    expect(saga.next().value).toEqual(call(api, 'locations'));

    // API call throws an error
    expect(saga.throw(response).value).toEqual(
      put(actions.locationsFetchFailed(response))
    );

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });
});

describe('Sagas - locationsSaga tests', () => {
  it('should check locations.isFetching and run an API call if value is false', () => {
    const saga = locationsSaga();

    // Saga checks fork for locationsGetAll
    expect(saga.next().value).toEqual(
      takeEvery(actions.LOCATIONS_GET_LOCATIONS, locationsGetAll)
    );

    // Saga checks fork for locationsGetAllIfNeeded
    expect(saga.next().value).toEqual(
      takeEvery(
        actions.LOCATIONS_GET_LOCATIONS_IF_NEEDED,
        locationsGetAllIfNeeded
      )
    );

    // Saga ends
    expect(saga.next()).toEqual(sagaEnd);
  });

  it('should stop if locations.isFetching=true', () => {
    const saga = locationsGetAllIfNeeded();

    // Saga checks result from shouldFetch selector
    expect(saga.next().value).toEqual(select(selectors.shouldFetch));

    // Value is false so saga ends
    expect(saga.next(false)).toEqual(sagaEnd);
  });
});
