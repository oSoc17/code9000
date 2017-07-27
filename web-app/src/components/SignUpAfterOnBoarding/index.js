import React, { Component } from 'react';
import SignUp from '../SignUp';
import Header from '../Header';
import classNames from '../../utils/classNames';

import './SignUpAfterOnBoarding.css';

import bertVerkijkerIcon from '../../theme/icons/bert_verkijker.svg';

class SignUpAfterOnBoarding extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      showContent: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showContent: true });
    }, 2500);
  }

  render() {
    const { showContent } = this.state;

    return (
      <div>
        <div className={classNames('SignUpAfterOnBoarding__Content', showContent && 'SignUpAfterOnBoarding__Content--visible')}>
          <SignUp />
        </div>
        <div className={classNames('App', 'SignUpAfterOnBoarding__Overlay', showContent && 'SignUpAfterOnBoarding__Overlay--hidden')}>
          <div className="SignUpAfterOnBoarding__Header">
            <Header />
          </div>
          <div className="SignUpAfterOnBoarding__Text">
            Awesome!<br />
            Let&apos;s get you signed up!
          </div>
          <img src={bertVerkijkerIcon} className="SignUpAfterOnBoarding__Bert" alt="Bert with a verkijker" />
        </div>
      </div>
    );
  }
}

export default SignUpAfterOnBoarding;
