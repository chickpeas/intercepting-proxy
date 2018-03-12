// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Network from '../components/Network';
import * as FilterActions from '../actions/filter';
import * as NetworkActions from '../actions/network';

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

function filterLogTable({ filter, network: { byId, byHash }, requests, responses }) {
  return byId.map((id, index) => {
    const { requestId, responseId } = byHash[id];
    if (responses[responseId] && responses[responseId].statusCode) {
      const { statusCode, mime } = responses[responseId];
      return {
        id,
        index,
        responseId,
        requestId,
        url: requests[requestId].url,
        method: requests[requestId].method,
        statusCode,
        mime
      };
    }
    const statusCode = '';

    return {
      index,
      id,
      requestId,
      url: requests[requestId].url,
      method: requests[requestId].method,
      statusCode
    };
  });
}

const mapStateToProps = (state) => ({
  network: state.network,
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
