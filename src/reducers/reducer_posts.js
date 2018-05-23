import _ from 'lodash';
import { FETCH_POST, FETCH_POSTS, CREATE_POST, DELETE_POST } from '../actions'; //don't need to specify Index

export default function(state={}, action) {
  switch(action.type) {
    case DELETE_POST:
    // Look at the state object, if it has this payload key- return new obj w/o it.
      return _.omit(state, action.payload);
    case FETCH_POST:
      const post = action.payload.data;
      // The square brackets do "key interpolation"
      return {...state, [action.payload.data.id] : action.payload.data }
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
