import React, { Component } from 'react';

import Title from '../Title';
import GuestMode, { GoBack } from '../GuestMode';
import { Form, Input, Button } from '../Form';

import api from '../../utils/api';

import './RequestResetPassword.css';

class RequestResetPassword extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
      success: false,
    };
  }

  requestResetPassword({ body }) {
    api.post('/auth/reset', body).then(() => {
      this.setState({ success: true });
    });
  }

  render() {
    const { isValid } = this.state;

    return (
      <GuestMode className="RequestResetPassword">
        <Title name="Reset Password" />
        <div className="GuestMode__Label">To reset, please fill in your email:</div>
        <Form
          onValidationChange={(valid) => this.setState({ isValid: valid })}
          onSubmit={(body) => this.requestResetPassword(body)}
        >
          <Input name="email" rules={['required', 'email']} placeholder="Email" className="RequestResetPassword__Input" />
          <div className="RequestResetPassword__Button">
            <Button disabled={!isValid}>Reset password</Button>
          </div>
        </Form>
        <GoBack />
      </GuestMode>
    );
  }
}

export default RequestResetPassword;
