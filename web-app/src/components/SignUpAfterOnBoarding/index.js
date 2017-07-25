import React, { Component } from 'react';
import SignUp from '../SignUp';

import './SignUpAfterOnBoarding.css';

import bertVerkijkerIcon from '../../theme/icons/bert_verkijker.svg';

class SignUpAfterOnBoarding extends Component {
  render() {
    return (
      <div className="Overlay">
        <div className="Overlay__Inner">
          <SignUp />
        </div>
        <div className="Overlay__Outer">
          <p className="Overlay__Outer__Text">
            Awesome!<br />
            Let's get you signed up, so<br />
            you can keep helping me!
          </p>
          <img
            src={bertVerkijkerIcon}
            alt="Avatar of Bert, the Bird nerd."
            className="OnBoard__Bert OnBoard__Bert__Animation"
          />
        </div>
      </div>
    );
  }
}

export default SignUpAfterOnBoarding;