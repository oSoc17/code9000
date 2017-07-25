/* global window */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../Title';
import Divider from '../Divider';
import GuestMode, { GoBack } from '../GuestMode';

import { Errors } from '../Alerts';
import { Form, Input, Button, FacebookButton } from '../Form';

import api, { BASE_URL } from '../../utils/api';
import redirect from '../../utils/redirect';

import './Login.css';

class Login extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
      errors: undefined,
    };
  }

  login(body) {
    api.post('/auth', body).then(({ data }) => {
      window.localStorage.setItem('jwt.token', data.token);
      redirect('/');
    })
    .catch(() => {
      this.setState({ errors: ['Your credentials are incorrect.'] });
    });
  }

  facebookLogin(event) {
    event.preventDefault();

    window.location = `${BASE_URL}/auth/facebook`;
  }

  render() {
    const { isValid, errors } = this.state;

    return (
      <GuestMode className="SignUp">
        <Title name="Login" />
        <div className="Login__Form">
          {errors && <Errors errors={errors} />}
          <Form
            onValidationChange={valid => this.setState({ isValid: valid })}
            onSubmit={data => this.login(data)}
          >
            <Input name="email" rules={['required', 'email']} placeholder="Email" icon="email" />
            <Input name="password" type="password" rules={['required']} placeholder="Password" className="Login__Password" icon="lock" />

            <div className="Login__ForgotPassword">
              Forgot password? <Link to="/reset-password">Reset Password</Link>
            </div>

            <div className="Login__LoginButton">
              <Button disabled={!isValid}>Log in</Button>
            </div>

            <Divider text="or" />

            <div className="Login__LoginButton">
              <FacebookButton onClick={(e) => this.facebookLogin(e)}>
                Sign in with Facebook
              </FacebookButton>
            </div>

            <div className="Login__SignUp">
              Not a member? <Link to="/sign-up">Sign up here!</Link>
            </div>

            <div className="Login__GoBack">
              <GoBack to="/start" text="To the tutorial"/>
            </div>
          </Form>
        </div>
      </GuestMode>
    );
  }
}

export default Login;
