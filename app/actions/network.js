// @flow
import { createId } from './../utils/index';

export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_PENDING_REQUEST = 'ADD_PENDING_REQUEST';
export const FORWARD_PENDING_REQUEST = 'FORWARD_PENDING_REQUEST';
export const DROP_PENDING_REQUEST = 'DROP_PENDING_REQUEST';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const ENABLE_FILTER = 'ENABLE_FILTER';

export function addRequest(id, req) {
  return {
    type: ADD_REQUEST,
    payload: {
      id,
      requestId: createId(),
      method: req.method,
      url: req.url,
      headers: req.headers
    }
  };
}
export function addPendingRequest(id, req) {
  return (dispatch) => {
    dispatch(addRequest(id, req));
    dispatch({
      type: ADD_PENDING_REQUEST,
      payload: {
        id
      }
    });
  };
}

export function forwardRequest() {
  return (dispatch) => {
    dispatch({
      type: FORWARD_PENDING_REQUEST
    });
  };
}

export function dropRequest() {
  return (dispatch) => {
    dispatch({
      type: DROP_PENDING_REQUEST
    });
  };
}

export function addResponse(id, { statusCode, headers }) {
  const mime = headers['content-type'];
  return {
    type: ADD_RESPONSE,
    payload: {
      id,
      responseId: createId(),
      statusCode,
      mime
    }
  };
}
