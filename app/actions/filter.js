// @flow

export const ENABLE_FILTER = 'ENABLE_FILTER';
export const ENABLE_MIME_FILTER = 'ENABLE_MIME_FILTER';
export const ENABLE_STATUS_FILTER = 'ENABLE_STATUS_FILTER';
export const FORWARD_REQUEST = 'FORWARD_REQUEST';

export function changeInterceptFilter(value: boolean) {
  return {
    type: ENABLE_FILTER,
    payload: {
      value
    }
  };
}

export function changeMimeFilter(value: Object) {
  return {
    type: ENABLE_MIME_FILTER,
    payload: {
      value
    }
  };
}

export function changeStatusFilter(value: Object) {
  return {
    type: ENABLE_STATUS_FILTER,
    payload: {
      value
    }
  };
}
