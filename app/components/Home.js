// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <p>Welcome to $intercepting-proxy (TODO find name)<br />
          - Configure your browser setting to use a proxy on port 8080
          - Go to Network to see your network request, click Forward to pass the request
          - Switch the button to pass all the request
          </p>
          <Link to="/network">to network</Link><br />
          <Link to="/setting">to setting</Link>
        </div>
      </div>
    );
  }
}
