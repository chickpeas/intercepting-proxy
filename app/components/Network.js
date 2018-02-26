// @flow
import React, { Component } from 'react';
import NetworkTable from './ui/NetworkTable';
import ActionBar from './ui/ActionBar';
import InfoPanel from './ui/InfoPanel';
import styles from './Network.css';

// TODO:
// TEST,
// ActionBar and InfoPanel should go on networkPage level,
// or have their own container
// or even remove/merge this component with network page?

type Props = {
  changeInterceptFilter: (boolean) => void,
  forwardRequest: () => void,
  network: Object,
  requests: Object,
  responses: Object,
  filter: Object
};

class Network extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      sidePanel: false,
      selected: {}
    };
  }

  handleInterceptClick = (value: boolean) => {
    this.props.changeInterceptFilter(value);
  }
  handleForwardClick = () => {
    this.props.forwardRequest();
  }
  handlePanelClick = ({ original: { requestId, responseId } }) => {
    const { requests, responses } = this.props;
    this.setState({
      sidePanel: true,
      selected: {
        requestId,
        request: requests[requestId],
        response: responses[responseId]
      }
    });
  }
  handleClosePanel = () => {
    this.setState({ sidePanel: false });
  }

  render() {
    const {
      sidePanel,
      selected,
    } = this.state;
    const {
      filter,
      requests: { pendingRequest }
    } = this.props;

    const { network: { byId, byHash }, responses, requests } = this.props;
    let statusCode;
    // TODO optimize this:
    const log = byId.map((id, index) => {
      const { requestId, responseId } = byHash[id];
      if (responses[responseId] && responses[responseId].statusCode) {
        statusCode = responses[responseId].statusCode;
        return {
          index,
          responseId,
          requestId,
          url: requests[requestId].url,
          method: requests[requestId].method,
          statusCode
        };
      }

      statusCode = '';
      return {
        index,
        requestId,
        url: requests[requestId].url,
        method: requests[requestId].method,
        statusCode
      };
    });
    const Info = (<InfoPanel handleClose={this.handleClosePanel} selected={selected} />);
    return (
      <div className={styles.networkMain}>
        <ActionBar
          filter={filter}
          handleClick={this.handleInterceptClick}
          handleForwardClick={this.handleForwardClick}
          pendingRequest={pendingRequest}
        />
        <div className={styles.networkContainer}>
          <NetworkTable network={log} handleClick={this.handlePanelClick} />
          { sidePanel ? Info : null }
        </div>
      </div>
    );
  }
}

export default Network;
