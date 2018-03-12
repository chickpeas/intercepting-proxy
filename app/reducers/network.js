// @flow
// import { Map, List, fromJS } from 'immutable';
import { ADD_REQUEST, ADD_RESPONSE } from '../actions/network';

export type networkStateType = {
  network: Object<{
    byId: Array,
    byHash: {
      requestId: string,
      responseId: string
    }
  }>
};

type actionType = {
  type: string,
  payload?: Object
};

const initialState = {
  byId: [],
  byHash: {}
};

export default function network(state: Object = initialState, action: actionType) {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        byId: [
          ...state.byId,
          action.payload.id
        ],
        byHash: {
          ...state.byHash,
          [action.payload.id]: {
            ...state[action.payload.id],
            requestId: action.payload.requestId
          }
        }
      };
    case ADD_RESPONSE:
      return {
        byId: [
          ...state.byId,
          action.payload.id
        ],
        ...state,
        byHash: {
          ...state.byHash,
          [action.payload.id]: {
            ...state.byHash[action.payload.id],
            responseId: action.payload.responseId
          }
        }
      };
    default:
      return state;
  }
}


export const getResponseIdById = ({ network: { byHash } }, id) => (byHash[id].requestId);

export const getResponseById = ({ network: { byId }, responses }, id) => (
  responses[byId[id].requestId]
);

export const getRequestIdById = ({ network: { byId } }, id) => (byId[id].requestId);

export const getRequestById = ({ network: { byId }, requests }, id) => (
  requests[byId[id].requestId]
);
