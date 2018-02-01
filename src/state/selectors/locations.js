// @flow

// import type { LocationType } from '@fixit/fixit-types';
import type { StateType } from '../reducers/locations';

type MainStateType = {
  locations: StateType
}

// isFetching flag selector
export const getIsFetching = (state: MainStateType): boolean =>
  state.locations.isFetching;

// selector deciding if locations should be fetched
export const shouldFetch = (state: MainStateType): boolean => {
  if (!state.locations.byId.length) {
    return true;
  } else if (state.locations.isFetching) {
    return false;
  }
  return state.locations.didInvalidate;
};

const selectors = {
  getIsFetching,
  shouldFetch
};

export default selectors;
