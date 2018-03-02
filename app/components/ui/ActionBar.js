// @flow
import React, { Component } from 'react';
import Switch from 'react-switch';

import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import styles from './ActionBar.scss';

// TODO:
// TEST

type Props = {
  handleClick: (boolean) => void,
  handleForwardClick: (boolean) => void,
  handleDropClick: (boolean) => void,
  pendingRequest: Array,
  filter: Object
};

export default class ActionBar extends Component<Props> {
  props: Props;

  render() {
    const { filter, pendingRequest } = this.props;
    const disabled = !(filter.intercept && pendingRequest.length !== 0);
    return (
      <Toolbar className={styles.barContainer}>
        <label className={styles.labelBox} htmlFor="intercept-switch">
          <div className={styles.center}>Intercept</div>
          <Switch
            checked={filter.intercept}
            onChange={(checked) => {
            this.props.handleClick(checked);
            }
          }
          />
        </label>
        <Button
          variant="raised"
          color="primary"
          className={styles.forward}
          onClick={this.props.handleForwardClick}
          disabled={disabled}
        >
            Forward
        </Button>
        <Button
          variant="raised"
          color="secondary"
          className={styles.forward}
          onClick={this.props.handleDropClick}
          disabled={disabled}
        >
            Drop
        </Button>
      </Toolbar>
    );
  }
}
