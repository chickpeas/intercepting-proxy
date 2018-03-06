import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
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
  shouldComponentUpdate({ network: nextNetwork }) {
    const { network } = this.props;
    if (nextNetwork.length === network.length) return true;
    return false;
  }

  handleRowClick = ({ rowData }) => {
    this.props.handleClick(rowData);
  }


  render() {
    const {
      network,
      columns
    } = this.props;
    const columnList = columns.map(({ header, accessor, width }) => {
      return (<Column
        label={header}
        dataKey={accessor}
        width={width}
      />);
    });

    return (
      <Table
        width={400}
        height={500}
        headerHeight={50}
        rowHeight={50}
        rowCount={network.length}
        onRowClick={this.handleRowClick}
        rowGetter={({ index }) => network[index]}
      >
        {columnList}
      </Table>
    );
  }
}

export default NetworkTable;
