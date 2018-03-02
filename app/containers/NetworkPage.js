// @flow
import { connect } from 'react-redux';
import Network from '../components/Network';
import * as FilterActions from '../actions/filter';
import * as NetworkActions from '../actions/network';

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

export default connect(mapStateToProps, mapDispatchToProps)(Network);
