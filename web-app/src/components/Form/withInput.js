import React, { Component } from 'react';

import classNames from '../../utils/classNames';
import validate from '../../utils/validator/validate';


const withInput = (WrappedComponent) => class extends Component {

  constructor(...props) {
    super(...props);

    this.state = {
      isValid: true,
    };
  }

  handleValueChange(event) {
    const key = this.props.name;
    const value = event.target.value;

    const { isValid } = validate({
      [key]: value,
    }, {
      [key]: this.props.rules,
    });

    this.setState({
      isValid,
    });

    this.props.onChange(event);
  }

  render() {
    const { isValid } = this.state;
    const { rules, className, ...rest } = this.props;

    return (
      <WrappedComponent
        {...rest}
        className={classNames(!isValid && 'Form__Field__Invalid')}
        onChange={(event) => this.handleValueChange(event)}
        onBlur={(event) => this.handleValueChange(event)}
      />
    );
  }
};

export default withInput;
