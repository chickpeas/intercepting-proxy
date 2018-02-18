// @flow
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

export default function responses(state: Object = initialState, action: actionType) {
  switch (action.type) {
    case ADD_RESPONSE:
      return {
        ...state,
        [action.payload.responseId]: {
          statusCode: action.payload.statusCode
        }
      };
    default:
      return state;
  }
}
