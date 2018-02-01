// @flow

import { normalize, schema } from 'normalizr';

type LocationType = {
  id: string
};

export type NormalizedLocationsType = {
  entities: {
    locations: Array<LocationType>
  },
  result: {
    locations: Array<string>
  }
};

export type ErrorType = {
  errorText: string
};

export type ActionsType = {
  +type: string,
  payload?: Array<LocationType> | NormalizedLocationsType | ErrorType
};

const locationSchema = new schema.Entity('locations');
const locationsSchema = { locations: [locationSchema] };

export const LOCATIONS_GET_LOCATIONS = 'LOCATIONS/GET_ALL';
export const locationsGetAll = (): ActionsType => ({
  type: LOCATIONS_GET_LOCATIONS
});

export const LOCATIONS_GET_LOCATIONS_IF_NEEDED = 'LOCATIONS/GET_ALL_IF_NEEDED';
export const locationsGetAllIfNeeded = (): ActionsType => ({
  type: LOCATIONS_GET_LOCATIONS_IF_NEEDED
});

export const LOCATIONS_FETCH_START = 'LOCATIONS/FETCH_START';
export const locationsFetchStart = (): ActionsType => ({
  type: LOCATIONS_FETCH_START
});

export const LOCATIONS_FETCH_SUCCEEDED = 'LOCATIONS/FETCH_SUCCEEDED';
export const locationsFetchSucceeded = (
  response: Array<LocationType>
): ActionsType => ({
  type: LOCATIONS_FETCH_SUCCEEDED,
  payload: normalize({ locations: response }, locationsSchema)
});

export const LOCATIONS_FETCH_FAILED = 'LOCATIONS/FETCH_FAILED';
export const locationsFetchFailed = (error: ErrorType): ActionsType => ({
  type: LOCATIONS_FETCH_FAILED,
  payload: error
});

export const LOCATIONS_INVALIDATE = 'LOCATIONS/INVALIDATE';
export const locationsInvalidate = (): ActionsType => ({
  type: LOCATIONS_INVALIDATE
});
