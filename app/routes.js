/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import networkPage from './containers/NetworkPage';

export default () => (
  <App>
    <Switch>
      <Route path="/network" component={networkPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
