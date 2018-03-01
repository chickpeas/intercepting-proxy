

export const responseEditor = { // eslint-disable-line import/prefer-default-export
  onResponse: (ctx, callback) => {
    if (ctx.serverToProxyResponse.headers['content-encoding']
      && ctx.serverToProxyResponse.headers['content-encoding'].toLowerCase() == 'gzip') {
      delete ctx.serverToProxyResponse.headers['content-encoding'];
      ctx.addResponseFilter();
    }
    return callback();
  },
  onRequest: (ctx, callback) => {
    ctx.proxyToServerRequestOptions.headers['accept-encoding'] = 'gzip';
    return callback();
  }
};
