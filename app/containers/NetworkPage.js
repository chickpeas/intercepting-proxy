// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Network from '../components/Network';
import * as FilterActions from '../actions/filter';
import * as NetworkActions from '../actions/network';
import * as fromRequests from '../reducers/requests';
import * as fromResponese from '../reducers/responses';
import * as fromNetwork from '../reducers/network';
import * as fromFilter from '../reducers/filter';
import { STATUS_CODE_REVERSE, MIME_TYPE_REVERSE } from './../utils/index';

const columns = [{
  header: '#',
  accessor: 'index',
  width: 40
}, {
  header: 'method',
  accessor: 'method',
  width: 80
}, {
  header: 'statusCode',
  accessor: 'statusCode',
  width: 80
}, {
  header: 'url',
  accessor: 'url',
  width: 160
}, {
  header: 'mime',
  accessor: 'mime',
  width: 80
}];

export const shouldRenderEntry = ({ mime = '', statusCode = '' }, filter) => {
  const status = STATUS_CODE_REVERSE[statusCode];
  const mimeType = MIME_TYPE_REVERSE[mime];
  const filterStatus = filter.statusCode[status] || (typeof filter.statusCode[status] === 'undefined');
  const filterMime = filter.mime[mimeType] || (typeof filter.mime[mimeType] === 'undefined');
  if (filterStatus && filterMime) {
    return true;
  }
  return false;
};

export const filterLogTable = (state) => {
  const byId = fromNetwork.getNetworkLog(state);
  const filter = fromFilter.getFilters(state);
  return byId.filter((entry) => {
    if (shouldRenderEntry(entry, filter)) {
      return true;
    }
    return false;
  });
};


const mapStateToProps = (state) => ({
  pendingRequest: state.requests.pendingRequest,
  filter: state.filter,
  log: filterLogTable(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeInterceptFilter: (value) => { dispatch(FilterActions.changeInterceptFilter(value)); },
  forwardRequest: () => { dispatch(NetworkActions.forwardRequest()); },
  dropRequest: () => { dispatch(NetworkActions.dropRequest()); }
});

class NetworkPage extends Component {
  render() {
    return (<Network columns={columns} {...this.props} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkPage);
