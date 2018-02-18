// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import filter from './filter';
import network from './network';
import requests from './requests';
import responses from './responses';

const rootReducer = combineReducers({
  network,
  requests,
  responses,
  filter,
  router,
});
export default rootReducer;
