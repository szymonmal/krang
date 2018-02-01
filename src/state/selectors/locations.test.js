import {
  getIsFetching,
  shouldFetch
} from './locations';

describe('Tests for getIsFetching', () => {
  it('should return value for state.locations.isFetching', () => {
    const expected = true;

    const state = {
      locations: {
        isFetching: expected
      }
    };

    expect(getIsFetching(state)).toEqual(expected);
  });
});

describe('Tests for shouldFetch', () => {
  it('should return true if isFetching is false and didInvalidate is false, but there are no items in state', () => {
    const state = {
      locations: {
        isFetching: false,
        didInvalidate: false,
        byId: [],
        items: {}
      }
    };

    expect(shouldFetch(state)).toEqual(true);
  });

  it('should return true if have items, isFetching is false and didInvalidate is true', () => {
    const state = {
      locations: {
        isFetching: false,
        didInvalidate: true,
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
      }
    };

    expect(shouldFetch(state)).toEqual(true);
  });

  it('should return false if isFetching is false and didInvalidate is false and there are items in state', () => {
    const state = {
      locations: {
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
      }
    };

    expect(shouldFetch(state)).toEqual(false);
  });

  it('should return false if have items, isFetching is true and didInvalidate is true', () => {
    const state = {
      locations: {
        isFetching: true,
        didInvalidate: true,
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
      }
    };

    expect(shouldFetch(state)).toEqual(false);
  });
});
