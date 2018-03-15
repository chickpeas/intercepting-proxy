import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import CloseIcon from 'material-ui-icons/Close';
import styles from './InfoPanel.scss';
import * as fromResponse from './../../reducers/responses';
import * as fromRequest from './../../reducers/requests';

type Props = {
  request: Object,
  response: Object,
  handleClose: () => {}
};

// TODO separate dumb and smart component
export class InfoPanel extends Component<Props> {
  props: Props;

  nestedRender(obj) {
    const keys = Object.keys(obj);
    const flatten = keys.map((key) => {
      if (Buffer.isBuffer(obj[key])) {
        const BodyToString = obj[key].toString();
        // I am breaking recursion, inside body there is no other object
        return (
          <span key={key} className={styles[key] ? styles[key] : key}>
            <span className={styles.label}>{key}</span>
            {BodyToString}
          </span>);
      }
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
    const { handleClose, request, response } = this.props;
    const requestComponent = this.nestedRender(request);
    const responseComponent = this.nestedRender(response);
    return (
      <div className={styles.infoContainer}>
        <IconButton className={styles.closeButton} aria-label="close panel" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subheading">Request</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { requestComponent }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subheading">Response</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { responseComponent }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
const mapStateToProps = (state, { selected: { requestId, responseId } }) => ({
  request: fromRequest.getRequestById(state, requestId),
  response: fromResponse.getResponseById(state, responseId)
});

export default connect(mapStateToProps)(InfoPanel);
