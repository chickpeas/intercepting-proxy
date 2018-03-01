// @flow
import { connect } from 'react-redux';
import Setting from '../components/Setting';
import * as FilterActions from '../actions/filter';

// TODO automate this from state
const setCheckbox = ({ mime, statusCode }) => (
  {
    mime: {
      label: 'Filter by MIME type',
      checks: [
        {
          value: 'html',
          label: 'HTML',
          checked: mime.html
        }, {
          value: 'script',
          label: 'Script',
          checked: mime.script
        }, {
          value: 'css',
          label: 'CSS',
          checked: mime.css
        }, {
          value: 'xml',
          label: 'XML',
          checked: mime.xml
        },
        {
          value: 'image',
          label: 'Image',
          checked: mime.image
        }, {
          value: 'flash',
          label: 'Flash',
          checked: mime.flash
        }, {
          value: 'binary',
          label: 'Other binary',
          checked: mime.binary
        }
      ]
    },
    statusCode: {
      label: 'Filter by statusCode',
      checks: [
        {
          value: 'success',
          label: 'success 200',
          checked: statusCode.success
        }, {
          value: 'redirect',
          label: 'redirect 300',
          checked: statusCode.redirect
        }, {
          value: 'requestErr',
          label: 'requestErr 400',
          checked: statusCode.requestErr
        }, {
          value: 'serverErr',
          label: 'serverErr 500',
          checked: statusCode.serverErr
        }
      ]
    }
  }
);

const mapStateToProps = (state) => (
  {
    checkboxes: setCheckbox(state.filter)
  }
);

const mapDispatchToProps = (dispatch) => ({
  changeMimeFilter: (value) => { dispatch(FilterActions.changeMimeFilter(value)); },
  changeStatusCodeFilter: (value) => { dispatch(FilterActions.changeStatusCodeFilter(value)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
