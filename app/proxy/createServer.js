import net from 'net';
import Proxy from 'http-mitm-proxy';
import os from 'os';
import { createId } from './../utils/index';
import {
  addRequest,
  addPendingRequest,
  addResponse,
  ENABLE_FILTER,
  ADD_PENDING_REQUEST,
  REMOVE_PENDING_REQUEST
} from './../actions/network';

// customize these:
const port = 8080;
const sslCaDir = os.tmpdir();

export default function createServer({ dispatch, getState }) {
  const proxy = Proxy();
  const requestsQueue = [];
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
      console.log(`Proxy server listening on ${port} cert folder in ${sslCaDir}, error ${e}`);
    }
  });

  function proxyCallback() {
    proxy.onRequestHandlers.shift();
    proxy.onRequest((ctx, callback) => {
      const id = createId();
      const { clientToProxyRequest: { headers, method, url } } = ctx;
      dispatch(addRequest(id, { headers, method, url }));
      ctx.onResponseEnd((ctx, callback) => {
        const { proxyToClientResponse: { statusCode } } = ctx;
        dispatch(addResponse(id, { statusCode }));
        return callback(null);
      });
      return callback();
    });
  }

  function interceptingProxyCallback() {
    proxy.onRequestHandlers.shift();
    proxy.onRequest((ctx, callback) => {
      const id = createId();
      const { clientToProxyRequest: { headers, method, url } } = ctx;
      dispatch(addPendingRequest(id, { headers, method, url }));
      requestsQueue.push(callback);
      ctx.onResponseEnd((ctx, callback) => {
        const { proxyToClientResponse: { statusCode } } = ctx;
        dispatch(addResponse(id, { statusCode }));
        return callback(null);
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
        case REMOVE_PENDING_REQUEST:
          cb = requestsQueue.shift();
          cb();
          next(action);
          return;
        default:
          next(action);
      }
    };
  };
}
