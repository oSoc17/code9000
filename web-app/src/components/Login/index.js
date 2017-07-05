import React, { Component } from 'react';

import Title from '../Title';
import { Form, Label, Input, Button } from '../Form';

import './index.css'

class Login extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
    }

    console.log(this.state.isValid);
  }

  render() {
    const { isValid } = this.state;

    return (
      <div className="Login">
        <Title name="Login" />
        <div className="Login__Wrapper">
          <Form
            onValidationChange={(valid) => this.setState({ isValid: valid })}
          >
            <Label text="Email address" />
            <Input name="email" rules={['required', 'email']} />

            <Label text="Password" />
            <Input name="password" type="password" rules={['required']} />

            <Button 
              disabled={!isValid}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;