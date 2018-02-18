import React, { Component } from 'react';
import styles from './InfoPanel.scss';
import Close from './../../img/close.svg';

type Props = {
  selected: Object,
  handleClose: () => {}
};


class InfoPanel extends Component<Props> {
  props: Props;

  nestedRender(obj) {
    const keys = Object.keys(obj);
    const flatten = keys.map((key) => {
      if (typeof obj[key] === 'object') {
        const flattenInner = this.nestedRender(obj[key]);
        return (
          <span key={key} className={styles[key] ? styles[key] : key}>
            <span className={styles.label}>{key}</span>
            {flattenInner}
          </span>);
      }
      return (
        <span className={styles[key] ? styles[key] : key} key={key}>
          <span className={styles.label}>{key}</span>
          <span className={styles.value}>{obj[key]}</span>
        </span>);
    });
    return (flatten);
  }

  render() {
    const { selected, handleClose } = this.props;
    const value = this.nestedRender(selected);

    return (
      <div className={styles.infoContainer}>
        <Close className={styles.closeIcon} onClick={handleClose} />
        { value }
      </div>
    );
  }
}

export default InfoPanel;
