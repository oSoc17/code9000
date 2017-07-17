/* global window */
import React, { Component } from 'react';

import GuestMode from '../GuestMode';
import Title from '../Title';
import { Input, Form, Button } from '../Form';

import api from '../../utils/api';

import './SignUp.css';

class SignUp extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
      busy: false,
    };
  }

  signUp(body) {
    this.setState({
      busy: true,
    });

    api.post('/auth/register', body)
      .then(({ data }) => {
        this.setState({ busy: false });

        // TODO: make an easier jwt token manager
        window.localStorage.setItem('jwt.token', data.token);
        window.location = '/';
      })
      .catch(() => {
        this.setState({ busy: false });
      });
  }

  render() {
    const { isValid, busy, success } = this.state;

    return (
      <GuestMode className="SignUp">
        <Title name="Sign up" />

        {!success && (
        <Form
          onValidationChange={(valid) => this.setState({ isValid: valid })}
          onSubmit={(body) => this.signUp(body)}
        >
          <Input name="name" rules={['required']} placeholder="Name" className="SignUp__Input" />
          <Input name="email" rules={['required', 'email']} placeholder="Email" className="SignUp__Input" />
          <Input name="password" type="password" rules={['required', 'password']} placeholder="Password" className="SignUp__Input" />
          <div className="SignUp__PasswordInformation">
            Password must be at least 5 characters long.
          </div>

          <div className="SignUp__Button">
            <Button disabled={!isValid || busy}>Sign up</Button>
          </div>
        </Form>
        )}
      </GuestMode>
    );
  }
}

export default SignUp;
