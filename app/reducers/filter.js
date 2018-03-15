// @flow
import { ENABLE_FILTER, ENABLE_MIME_FILTER, ENABLE_STATUSCODE_FILTER } from '../actions/filter';

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
    css: true,
    script: true,
    html: true,
    xml: true,
    image: true,
    flash: true,
    binary: true
  },
  statusCode: {
    success: true,
    redirect: true,
    requestErr: true,
    serverErr: true
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
          ...state.mime,
          ...action.payload.value
        }
      };
    case ENABLE_STATUSCODE_FILTER:
      return {
        ...state,
        statusCode: {
          ...state.statusCode,
          ...action.payload.value
        }
      };
    default:
      return state;
  }
}

export const getFilters = ({ filter: { intercept, mime = {}, statusCode = {} } }) => (
  {
    intercept,
    mime,
    statusCode
  }
);
