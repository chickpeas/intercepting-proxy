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

export const getNetworkLog = ({ network: { byId, byHash }, requests, responses }) => (
  byId.map((id, index) => {
    const { requestId, responseId = '' } = byHash[id];
    const { [responseId]: reponse = {} } = responses;
    const { statusCode = '', mime = '' } = reponse;
    return {
      id,
      index,
      responseId,
      requestId,
      url: requests[requestId].url,
      method: requests[requestId].method,
      statusCode,
      mime
    };
  })
);

export const getResponseIdById = ({ network: { byHash } }, id) => (byHash[id].requestId);

export const getResponseById = ({ network: { byId }, responses }, id) => (
  responses[byId[id].reponseId]
);

export const getRequestIdById = ({ network: { byHash } }, id) => (byHash[id].responseId);

export const getRequestById =
  ({
    network: { byId },
    requests
  }, id) => (
    requests[byId[id].requestId]
);
