import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './NetworkTable.scss';

// TODO:
// TEST

type Props = {
  handleClick: () => void,
  log: Array,
  columns: Array
};
// TODO move to container

class NetworkTable extends Component<Props> {
  shouldComponentUpdate({ log: nextLog }) {
    const { log } = this.props;
    if (nextLog.length === log.length) return true;
    return false;
  }

  handleRowClick = ({ rowData }) => {
    this.props.handleClick(rowData);
  }


  render() {
    const {
      log,
      columns
    } = this.props;
    const columnList = columns.map(({ header, accessor, width }) => (<Column
      key={accessor}
      label={header}
      dataKey={accessor}
      width={width}
    />));

    return (
      <Table
        className={styles.table}
        width={400}
        height={500}
        headerHeight={50}
        rowHeight={50}
        rowCount={log.length}
        onRowClick={this.handleRowClick}
        rowGetter={({ index }) => log[index]}
      >
        {columnList}
      </Table>
    );
  }
}

export default NetworkTable;
