import React, { Component } from 'react';
import ReactTable from 'react-table';
import styles from './NetworkTable.scss';
// TODO:
// TEST

type Props = {
  handleClick: () => void,
  network: Array,
  columns: Array
};
// TODO move to container

class NetworkTable extends Component<Props> {
  render() {
    const {
      network,
      columns
    } = this.props;

    return (
      <ReactTable
        data={network}
        columns={columns}
        className={styles.table}
        getTrProps={(state, rowInfo) => ({
            onClick: () => {
              this.props.handleClick(rowInfo);
            }
          })}
        filterable
      />
    );
  }
}

export default NetworkTable;
