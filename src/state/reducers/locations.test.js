import { locations as actions } from '../actions';
import reducer, { initialState } from './locations';

describe('Reducers - locations basic tests', () => {
  it('should return default state when empty', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return same state when no action provided', () => {
    const state = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1903190'],
      items: {
        '1903190': {
          name: 'Example location',
          street: 'Example street 4',
          city: 'Example city',
          zip: '11011',
          coordinates: { lat: 123, lng: 10 },
          id: '1903190'
        }
      }
    };

    expect(reducer(state, {})).toEqual(state);
  });
});

describe('Reducers - locations fetching all flow', () => {
  it('should set isFetching on true when using fetch start', () => {
    const expected = {
      isFetching: true,
      didInvalidate: false,
      byId: [],
      items: {}
    };

    const action = actions.locationsFetchStart();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should add response to empty state when fetch succeeded', () => {
    const expected = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1903190'],
      items: {
        '1903190': {
          name: 'Example location',
          street: 'Example street 4',
          city: 'Example city',
          zip: '11011',
          coordinates: { lat: 123, lng: 10 },
          id: '1903190'
        }
      }
    };

    const action = actions.locationsFetchSucceeded([
      {
        name: 'Example location',
        street: 'Example street 4',
        city: 'Example city',
        zip: '11011',
        coordinates: { lat: 123, lng: 10 },
        id: '1903190'
      }
    ]);

    expect(reducer(initialState, action)).toEqual(expected);
  });

  it('should add second response to preexisting state when fetch succeeded', () => {
    const state = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1903190'],
      items: {
        '1903190': {
          name: 'Example location',
          street: 'Example street 4',
          city: 'Example city',
          zip: '11011',
          coordinates: { lat: 123, lng: 10 },
          id: '1903190'
        }
      }
    };

    const expected = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1903190', '1901325'],
      items: {
        '1903190': {
          name: 'Example location',
          street: 'Example street 4',
          city: 'Example city',
          zip: '11011',
          coordinates: { lat: 123, lng: 10 },
          id: '1903190'
        },
        '1901325': {
          name: 'Second example',
          street: 'Example street 123',
          city: 'Example city',
          zip: '11014',
          coordinates: { lat: 123, lng: 15 },
          id: '1901325'
        }
      }
    };

    const action = actions.locationsFetchSucceeded([
      {
        name: 'Second example',
        street: 'Example street 123',
        city: 'Example city',
        zip: '11014',
        coordinates: { lat: 123, lng: 15 },
        id: '1901325'
      }
    ]);

    expect(reducer(state, action)).toEqual(expected);
  });

  it("should update the item if it's already in the state", () => {
    const state = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1901325'],
      items: {
        '1901325': {
          name: 'Second example',
          street: 'Example street 123',
          city: 'Example city',
          zip: '11014',
          coordinates: { lat: 123, lng: 15 },
          id: '1901325'
        }
      }
    };

    const expected = {
      isFetching: false,
      didInvalidate: false,
      byId: ['1901325'],
      items: {
        '1901325': {
          name: 'Updated example',
          street: 'Updated example street 123',
          city: 'Example city',
          zip: '11014',
          coordinates: { lat: 123, lng: 15 },
          id: '1901325'
        }
      }
    };

    const action = actions.locationsFetchSucceeded([
      {
        name: 'Updated example',
        street: 'Updated example street 123',
        city: 'Example city',
        zip: '11014',
        coordinates: { lat: 123, lng: 15 },
        id: '1901325'
      }
    ]);

    expect(reducer(state, action)).toEqual(expected);
  });

  it('should return error and set isFetching to false when using fetch failed', () => {
    const expected = {
      isFetching: false,
      didInvalidate: true,
      byId: [],
      items: {}
    };

    const action = actions.locationsFetchFailed({
      errorText: 'Something went wrong!'
    });

    expect(reducer(undefined, action)).toEqual(expected);
  });
});
