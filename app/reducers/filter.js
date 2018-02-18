// @flow
import { ENABLE_FILTER, ENABLE_MIME_FILTER, ENABLE_STATUS_FILTER } from '../actions/filter';

export type filterStateType = {
  intercept: boolean,
  mime: {
    css: boolean
  }
};

type actionType = {
  type: string,
  payload?: Object
};

const initialState = {
  intercept: true,
  mime: {
    css: false,
    html: false
  }
};

export default function filter(state: Object = initialState, action: actionType) {
  switch (action.type) {
    case ENABLE_FILTER:
      return {
        ...state,
        intercept: action.payload.value
      };
    case ENABLE_MIME_FILTER:
      return {
        ...state,
        mime: {
          [action.payload.value]: true
        }
      };
    case ENABLE_STATUS_FILTER:
      return {
        ...state,
        status: {
          [action.payload.value]: true
        }
      };
    default:
      return state;
  }
}
