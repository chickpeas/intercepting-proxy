// @flow
import { createId } from './../utils/index';
import * as fromResponses from './../reducers/network';

export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_REQUEST_BODY = 'ADD_REQUEST_BODY';
export const ADD_PENDING_REQUEST = 'ADD_PENDING_REQUEST';
export const FORWARD_PENDING_REQUEST = 'FORWARD_PENDING_REQUEST';
export const DROP_PENDING_REQUEST = 'DROP_PENDING_REQUEST';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const ENABLE_FILTER = 'ENABLE_FILTER';

export function addRequest(id, { method, url, headers, body = {} }) {
  return {
    type: ADD_REQUEST,
    payload: {
      id,
      requestId: createId(),
      method,
      url,
      headers,
      body
    }
  };
}
export function addRequestBody(id, body) {
  return (dispatch, getState) => {
    const requestId = fromResponses.getResponseIdById(getState(), id);
    return {
      type: ADD_REQUEST_BODY,
      payload: {
        requestId,
        body
      }
    };
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

export function addResponse(id, { statusCode, headers, body }) {
  const mime = headers['content-type'];
  return {
    type: ADD_RESPONSE,
    payload: {
      id,
      responseId: createId(),
      statusCode,
      mime,
      body
    }
  };
}
