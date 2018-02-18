// @flow
import React, { Component } from 'react';
import Switch from 'react-switch';
import styles from './ActionBar.scss';

// TODO:
// TEST

type Props = {
  handleClick: (boolean) => void,
  handleForwardClick: (boolean) => void,
  pendingRequest: Array,
  filter: Object
};

export default class ActionBar extends Component<Props> {
  props: Props;

  render() {
    const { filter, pendingRequest } = this.props;
    const disabled = !(filter.intercept && pendingRequest.length !== 0);

    return (
      <div className={styles.barContainer}>
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
        <button
          className={styles.forward}
          onClick={this.props.handleForwardClick}
          disabled={disabled}
        >
            Forward
        </button>
      </div>
    );
  }
}
