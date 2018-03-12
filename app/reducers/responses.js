// @flow
// import { Map, List } from 'immutable';
import { ADD_RESPONSE } from '../actions/network';

export type responseStateType = {
  response: Object<{
    [responseId: string]: {
      method: string
    }
  }>
};

type actionType = {
  type: string,
  payload?: Object
};

const initialState = {};
// const initialState = Map();


export default function responses(state: Object = initialState, action: actionType) {
  switch (action.type) {
    case ADD_RESPONSE:
      return {
        ...state,
        [action.payload.responseId]: {
          statusCode: action.payload.statusCode,
          mime: action.payload.mime,
          body: action.payload.body
        }
      };
    default:
      return state;
  }
}

export const getBodyByResponseId = (
  {
    responses: response
  },
  responseId
) => (response[responseId].body);

export const getBodyByResponseIdAsString = (
  {
    responses: response
  },
  responseId
) => (response[responseId].body.toString());
