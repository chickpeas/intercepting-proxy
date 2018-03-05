import net from 'net';
import Proxy from 'http-mitm-proxy';
import os from 'os';
import { createId } from './../utils/index';
import {
  addRequest,
  addPendingRequest,
  addResponse,
  addRequestBody,
  ENABLE_FILTER,
  ADD_PENDING_REQUEST,
  FORWARD_PENDING_REQUEST,
  DROP_PENDING_REQUEST
} from './../actions/network';
import { ENABLE_MIME_FILTER, ENABLE_STATUSCODE_FILTER } from './../actions/filter';
// import { responseEditor } from './middleware';

// customize this:
const port = 8080;
const sslCaDir = os.tmpdir();

export default function createServer({ dispatch, getState }) {
  const proxy = Proxy();
  // proxy.use(responseEditor);
  // const requestsQueue = [];
  proxy.requestsQueue = [];
  const callbackHash = {
    request: {},
    response: {},
    cb: {}
  };

  // get the tunnel ready
  proxy.onConnect((req, socket) => {
    const host = req.url.split(':')[0];
    const httpsPort = req.url.split(':')[1];

    console.log('Tunnel to', req.url);
    const conn = net.connect(httpsPort, host, () => {
      socket.write('HTTP/1.1 200 OK\r\n\r\n', 'UTF-8', () => {
        conn.pipe(socket);
        socket.pipe(conn);
      });
    });

    conn.on('error', (e) => {
      console.log('Tunnel error', e);
    });
  });

  proxy.listen({ port, sslCaDir }, (e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Proxy server listening on ${port}`);
    } if (e) {
      console.log(`Error: ${e}`);
    }
  });
  function pushRequestCallback(requestCallbackId) {
    callbackHash.request[requestCallbackId] = proxy.onRequestHandlers.length - 1;
  }

  function proxyCallback() {
    proxy.onRequestHandlers.shift();
    const requestCallbackId = createId();
    pushRequestCallback(requestCallbackId);
    proxy.onRequest((ctx, callback) => {
      const id = createId();
      const { clientToProxyRequest: { headers, method, url } } = ctx;
      dispatch(addRequest(id, { headers, method, url }));
      ctx.onResponseEnd((context, cb) => {
        // .serverToProxyResponse.headers["content-type"]
        const {
          proxyToClientResponse:
            { statusCode },
          serverToProxyResponse:
            { headers: responseHeaders }
        } = context;
        dispatch(addResponse(id, { statusCode, headers: responseHeaders }));
        return cb(null);
      });
      return callback();
    });
  }

  function interceptingProxyCallback() {
    const responseChunks = [];
    const requestChunks = [];
    proxy.onRequestHandlers.shift();
    const requestCallbackId = createId();
    pushRequestCallback(requestCallbackId);

    proxy.onRequest((ctx, callback) => {
      const id = createId();
      const { clientToProxyRequest: { headers, method, url } } = ctx;
      dispatch(addPendingRequest(id, { headers, method, url }));
      proxy.requestsQueue.push(callback);
      callbackHash.cb[id] = proxy.requestsQueue.length - 1;
      ctx.onRequestData((context, chunk, cb) => {
        requestChunks.push(chunk);
        return cb(null, chunk);
      });
      ctx.onRequestEnd((context, cb) => {
        const body = Buffer.concat(requestChunks);
        dispatch(addRequestBody(id, body));
        return cb();
      });
      ctx.onResponseData((context, chunk, cb) => {
        responseChunks.push(chunk);
        return cb(null, chunk);
      });
      ctx.onResponseEnd((context, cb) => {
        const {
          proxyToClientResponse: { statusCode },
          serverToProxyResponse: { headers }
        } = context;
        const body = Buffer.concat(responseChunks);
        ctx.proxyToClientResponse.write(body);
        dispatch(addResponse(id, { statusCode, headers, body }));
        return cb(null);
      });
    });
  }


  // MIDDLEWARE:
  return (next) => {
    const { filter: { intercept } } = getState();
    let cb;
    if (!intercept) proxyCallback();
    else interceptingProxyCallback();
    return (action) => {
      switch (action.type) {
        case ENABLE_FILTER:
          if (action.payload.value) interceptingProxyCallback();
          else proxyCallback();
          next(action);
          return;
        case ADD_PENDING_REQUEST:
          next(action);
          return;
        case FORWARD_PENDING_REQUEST:
          cb = proxy.requestsQueue.shift();
          cb();
          next(action);
          return;
        case DROP_PENDING_REQUEST:
          proxy.requestsQueue.shift();
          // cb(); NOPE
          next(action);
          return;
        case ENABLE_STATUSCODE_FILTER:
        case ENABLE_MIME_FILTER:
          next(action);
          return;
        default:
          next(action);
      }
    };
  };
}
