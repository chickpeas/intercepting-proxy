import uuid from 'uuid';

export function createId() { // eslint-disable-line import/prefer-default-export
  return uuid();
}
export const STATUS_CODE = {
  redirect: 300,
  requestErr: 400,
  serverErr: 500,
  success: 200
};

export const STATUS_CODE_REVERSE = {
  300: 'redirect',
  400: 'requestErr',
  500: 'serverErr',
  200: 'success'
};

export const MIME_TYPE = {
  binary: 'application/octet-stream',
  css: 'text/css',
  flash: 'application/x-shockwave-flash',
  html: 'text/html',
  image: 'image/*',
  xml: 'application/xml'
};

export const MIME_TYPE_REVERSE = {
  'application/octet-stream': 'binary',
  'text/css': 'css',
  'application/x-shockwave-flash': 'flash',
  'text/html': 'html',
  image: 'image',
  'application/xml': 'xml'
};
