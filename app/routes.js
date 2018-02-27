/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NetworkPage from './containers/NetworkPage';
import SettingPage from './containers/SettingPage';

export default () => (
  <App>
    <Switch>
      <Route path="/network" component={NetworkPage} />
      <Route path="/setting" component={SettingPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
