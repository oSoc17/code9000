import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import GuestMode from '../GuestMode';
import Title from '../Title';
import { Button } from '../Form';

import classNames from '../../utils/classNames';

import './StartScreen.css';

const Dot = ({ className }) => {
  return (
    <div className={classNames('StartScreen__Dot', className)} />
  );
};

class StartScreen extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      redirect: false,
    };
  }

  login() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }

    return (
      <GuestMode className="StartScreen">
        <Title name="Welcome" />
        <div className="StartScreen__Item StartScreen__Title">
          birds.today
        </div>
        <div className="StartScreen__Item StartScreen__SubTitle">
          A bird spotting app
        </div>

        <div className="StartScreen__Dots">
          <Dot className="StartScreen__Dot--active" />
          <Dot />
          <Dot />
          <Dot />
        </div>

        <Button className="StartScreen__Item StartScreen__Button__Start">Start</Button>
        <Button light className="StartScreen__Item StartScreen__Button__LogIn" onClick={() => this.login()}>Log in</Button>
      </GuestMode>
    );
  }
}

export default StartScreen;
