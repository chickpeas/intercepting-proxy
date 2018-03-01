// @flow
import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import FormControlGroup from './ui/FormControlGroup';

type Props = {
  checkboxes: Object,
  changeMimeFilter: () => {},
  changeStatusCodeFilter: () => {}
};

export default class Setting extends Component<Props> {
  props: Props;

  handleMimeChange = (name, event, checked) => {
    console.log(name, event);
    this.props.changeMimeFilter({ [name]: checked });
  };
  handleStatusCodeChange = (name, event, checked) => {
    console.log('there', name, event, checked);
    this.props.changeStatusCodeFilter({ [name]: checked });
  };

  render() {
    const { checkboxes: { mime, statusCode } } = this.props;
    return (
      <Toolbar>
        <FormControlGroup
          checkboxes={mime}
          handleChange={this.handleMimeChange}
        />
        <FormControlGroup
          checkboxes={statusCode}
          handleChange={this.handleStatusCodeChange}
        />
      </Toolbar>
    );
  }
}
