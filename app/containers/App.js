// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import styles from './App.scss';

type Props = {
  children: React.Node
};

export default class App extends Component<Props> {
  props: Props;
  state = {
    value: 0
  }
  handleChange = (ev, value) => {
    this.setState({ value });
  }


  render() {
    const { children } = this.props;
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Network" component={Link} to="/network" />
            <Tab label="Setting" component={Link} to="/setting" />
          </Tabs>
        </AppBar>
        <div className={styles.panes}>
          {children}
        </div>
      </div>
    );
  }
}
