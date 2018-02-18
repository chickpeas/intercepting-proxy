// @flow
import { ADD_REQUEST, ADD_PENDING_REQUEST, REMOVE_PENDING_REQUEST } from '../actions/network';

export type requestStateType = {
  requests: Object<{
    [requestId: string]: {
      url: string
    }
  }>
};

type actionType = {
  type: string,
  payload?: Object
};

const initialState = {
  pendingRequest: []
};

export default function requests(state: Object = initialState, action: actionType) {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        [action.payload.requestId]: {
          headers: action.payload.headers,
          method: action.payload.method,
          url: action.payload.url
        }
      };
    case ADD_PENDING_REQUEST:
      return {
        ...state,
        pendingRequest: [
          ...state.pendingRequest,
          action.payload.id]
      };
    case REMOVE_PENDING_REQUEST:
      return {
        ...state,
        pendingRequest: [
          ...state.pendingRequest.slice(1)
        ]
      };
    default:
      return state;
  }
}
