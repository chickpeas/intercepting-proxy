/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import NetworkPage from './containers/NetworkPage';
import SettingPage from './containers/SettingPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/network" component={NetworkPage} />
      <Route path="/setting" component={SettingPage} />
    </Switch>
  </App>
);
