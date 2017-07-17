import React, { Component } from 'react';

import Title from '../Title';
import GuestMode from '../GuestMode';
import { Form, Input, Button } from '../Form';

import './ResetPassword.css';

class ResetPassword extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
    };
  }


  render() {
    const { isValid } = this.state;

    return (
      <GuestMode className="ResetPassword">
        <Title name="Reset Password" />
        <Form
          onValidationChange={(valid) => this.setState({ isValid: valid })}
        >
          <Input name="email" rules={['required', 'email']} placeholder="Email" />
          <div className="ResetPassword__Button">
            <Button disabled={!isValid}>Reset</Button>
          </div>
        </Form>
      </GuestMode>
    );
  }
}

export default ResetPassword;
