// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

if (process.env.DEBUG === 'performance') {
  const { whyDidYouUpdate } = require('why-did-you-update'); // eslint-disable-line global-require
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
