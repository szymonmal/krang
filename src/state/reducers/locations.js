// @flow

import { locations as locationsActions } from '../actions';
import type { ActionsType } from '../actions/locations';

type Exact<T> = T & $Shape<T>;

export type StateType = {
  +byId: Array<string>,
  +items: Exact<{}>,
  +isFetching: boolean,
  +didInvalidate: boolean
};

export const initialState: StateType = {
  byId: [],
  items: {},
  isFetching: false,
  didInvalidate: false
};

export default function locations(
  state: StateType = initialState,
  action: ActionsType
): StateType {
  /* $FlowIssue - flow issue regarding union types -> https://github.com/facebook/flow/issues/2856 */
  const { entities, result } = action.payload || {};
  switch (action.type) {
    case locationsActions.LOCATIONS_INVALIDATE:
      return { ...state, didInvalidate: true };
    case locationsActions.LOCATIONS_FETCH_START:
      return { ...state, isFetching: true };
    case locationsActions.LOCATIONS_FETCH_FAILED:
      return { ...state, isFetching: false, didInvalidate: true };
    case locationsActions.LOCATIONS_FETCH_SUCCEEDED:
      return {
        isFetching: false,
        didInvalidate: false,
        byId: [...new Set([...state.byId, ...result.locations])],
        /* $FlowIssue - flow issue related to spread -> https://github.com/facebook/flow/issues/2405 */
        items: {
          ...state.items,
          ...entities.locations
        }
      };
    default:
      return state;
  }
}
