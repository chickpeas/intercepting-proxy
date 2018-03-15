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
  dropRequest: () => void,
  log: Array,
  filter: Object,
  columns: Array,
  pendingRequest: Array
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
  handleDropClick = () => {
    this.props.dropRequest();
  }
  handlePanelClick = ({ id, responseId, requestId }) => {
    this.setState({
      sidePanel: true,
      selected: {
        id,
        responseId,
        requestId,
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
      pendingRequest,
      columns
    } = this.props;

    const { log } = this.props;
    const Info = (<InfoPanel handleClose={this.handleClosePanel} selected={selected} />);
    return (
      <div className={styles.networkMain}>
        <ActionBar
          filter={filter}
          handleClick={this.handleInterceptClick}
          handleForwardClick={this.handleForwardClick}
          handleDropClick={this.handleDropClick}
          pendingRequest={pendingRequest}
        />
        <div className={styles.networkContainer}>
          <NetworkTable columns={columns} log={log} handleClick={this.handlePanelClick} />
          { sidePanel ? Info : null }
        </div>
      </div>
    );
  }
}

export default Network;
