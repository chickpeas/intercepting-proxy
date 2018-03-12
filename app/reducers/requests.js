// @flow
// import { Map } from 'immutable';
import { ADD_REQUEST, ADD_REQUEST_BODY, ADD_PENDING_REQUEST, FORWARD_PENDING_REQUEST, DROP_PENDING_REQUEST } from '../actions/network';

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
          url: action.payload.url,
          body: action.payload.body
        }
      };
    case ADD_REQUEST_BODY:
      return {
        ...state,
        [action.payload.requestId]: {
          ...state[action.payload.requestId],
          body: action.payload.body
        }
      };
    case ADD_PENDING_REQUEST:
      return {
        ...state,
        pendingRequest: [
          ...state.pendingRequest,
          action.payload.id]
      };
    case FORWARD_PENDING_REQUEST:
    case DROP_PENDING_REQUEST:
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

export const getBodyByRequestId = (
  {
    requests: request
  },
  requestId
) => (request[requestId].body);

export const getBodyByRequestIdAsString = (
  {
    requests: request
  },
  requestId
) => (request[requestId].body.toString());
