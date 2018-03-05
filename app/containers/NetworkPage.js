// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Network from '../components/Network';
import * as FilterActions from '../actions/filter';
import * as NetworkActions from '../actions/network';

const columns = [{
  Header: '#',
  accessor: 'index',
  width: 40,
  filterable: false
}, {
  Header: 'method',
  accessor: 'method',
  width: 80
}, {
  Header: 'statusCode',
  accessor: 'statusCode',
  width: 80
}, {
  Header: 'url',
  accessor: 'url'
}, {
  Header: 'mime',
  accessor: 'mime',
  width: 80
}];

const mapStateToProps = (state) => ({
  network: state.network,
  responses: state.responses,
  requests: state.requests,
  filter: state.filter
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
