import React, { Component } from 'react';
import ReactTable from 'react-table';
import styles from './NetworkTable.scss';
// TODO:
// TEST

type Props = {
  handleClick: () => void,
  network: Array
};
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
}];

class NetworkTable extends Component<Props> {
  render() {
    const {
      network
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
