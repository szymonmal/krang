import { locations as actions } from './';

describe('Actions - fetching all locations flow', () => {
  it('locationsGetAll should return proper action type', () => {
    const expected = {
      type: actions.LOCATIONS_GET_LOCATIONS
    };

    expect(actions.locationsGetAll()).toEqual(expected);
  });

  it('locationsGetAllIfNeeded should return proper action type', () => {
    const expected = {
      type: actions.LOCATIONS_GET_LOCATIONS_IF_NEEDED
    };

    expect(actions.locationsGetAllIfNeeded()).toEqual(expected);
  });

  it('locationsFetchStart should return proper action type', () => {
    const expected = {
      type: actions.LOCATIONS_FETCH_START
    };

    expect(actions.locationsFetchStart()).toEqual(expected);
  });

  it('locationsFetchSucceeded should return proper action type and data', () => {
    const params = [
      {
        name: 'Example location',
        street: 'Example street 4',
        city: 'Example city',
        zip: '11011',
        coordinates: { lat: 123, lng: 10 },
        id: '1903190'
      }
    ];

    const expected = {
      type: actions.LOCATIONS_FETCH_SUCCEEDED,
      payload: {
        entities: {
          locations: {
            '1903190': {
              name: 'Example location',
              street: 'Example street 4',
              city: 'Example city',
              zip: '11011',
              coordinates: { lat: 123, lng: 10 },
              id: '1903190'
            }
          }
        },
        result: { locations: ['1903190'] }
      }
    };

    expect(actions.locationsFetchSucceeded(params)).toEqual(expected);
  });

  it('locationsFetchFailed should return proper action type and data', () => {
    const params = {
      errorText: 'Some error from the server'
    };

    const expected = {
      type: actions.LOCATIONS_FETCH_FAILED,
      payload: { ...params }
    };

    expect(actions.locationsFetchFailed(params)).toEqual(expected);
  });

  it('locationsInvalidate should return proper action type', () => {
    const expected = {
      type: actions.LOCATIONS_INVALIDATE
    };

    expect(actions.locationsInvalidate()).toEqual(expected);
  });
});
