import React, { Component } from 'react';
import SignUp from '../SignUp';

class SignUpAfterOnBoarding extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
      busy: false,
    };
  }

  render() {
    return (
      <SignUp />
    );
  }
}

export default SignUpAfterOnBoarding;