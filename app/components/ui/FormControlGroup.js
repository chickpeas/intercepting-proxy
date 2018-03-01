// @flow
import React, { Component } from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

type Props = {
  checkboxes: {
    label?: string,
    helperText?: string,
    checks: Array
  },
  handleChange: () => void
};

export default class FormControlGroup extends Component<Props> {
  props: Props;
  state = {}

  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
    this.props.handleChange(name, event, checked);
  };

  render() {
    const {
      checkboxes: {
        label,
        helperText,
        checks,
      }
    } = this.props;
    const checkList = checks.map(({ value, checked, label: checklabel }) =>
      (<FormControlLabel
        control={
          <Checkbox
            checked={(typeof this.state[value] === 'undefined') ? checked : this.state[value]}
            onChange={this.handleChange(value)}
            value={value}
          />
        }
        label={checklabel}
      />));

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
          {checkList}
        </FormGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
}
