// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

if (process.env.NODE_ENV !== 'production' && process.env.DEBUG_PERFORMANCE === true) {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
