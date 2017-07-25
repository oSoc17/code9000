import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import GuestMode from '../GuestMode';
import Title from '../Title';
import { Button } from '../Form';

import './StartScreen.css';

class StartScreen extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      redirect: false,
      to: undefined,
    };
  }

  login() {
    this.setState({
      redirect: true,
      to: '/login',
    });
  }

  startOnboarding() {
    this.setState({
      redirect: true,
      to: '/start',
    });
  }

  render() {
    const { redirect, to } = this.state;

    if (redirect) {
      return <Redirect push to={to} />;
    }

    return (
      <GuestMode className="StartScreen">
        <Title name="Welcome" />
        <div className="StartScreen__Title">
          birds.today
        </div>
        <div className="StartScreen__SubTitle">
          A bird spotting app
        </div>
        <div className="StartScreen__Buttons">
          <Button className="StartScreen__Buttons__Start" onClick={() => this.startOnboarding()}>Start</Button>
          <Button className="StartScreen__Buttons__LogIn" onClick={() => this.login()}>Log in</Button>
        </div>
      </GuestMode>
    );
  }
}

export default StartScreen;
