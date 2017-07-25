import React, { Component } from 'react';
import SignUp from '../SignUp';

import './SignUpAfterOnBoarding.css';

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
      <div className="Overlay">
        <SignUp />
       </div>
    );
  }
}

export default SignUpAfterOnBoarding;