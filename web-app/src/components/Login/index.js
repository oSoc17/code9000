/* global window */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Title from '../Title';
import Divider from '../Divider';
import { Form, Input, Button, FacebookButton } from '../Form';
import Errors from '../Errors';

import api, { BASE_URL } from '../../utils/api';

import logo from '../../theme/crest.svg';
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
      // TODO: make an easier jwt token manager
      window.localStorage.setItem('jwt.token', data.token);
      window.location = '/';
    })
    .catch(({ data: errors }) => {
      this.setState({ errors });
    });
  }

  facebookLogin(event) {
    event.preventDefault();

    window.location = `${BASE_URL}/auth/facebook`;
  }

  render() {
    const { isValid, errors } = this.state;

    return (
      <div className="Login">
        <Title name="Login" />
        <div className="Login__Wrapper">
          <img src={logo} alt="CODE9000 crest" className="Login__Logo" />
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
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
