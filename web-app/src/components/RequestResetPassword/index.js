import React, { Component } from 'react';

import Title from '../Title';
import GuestMode, { GoBack } from '../GuestMode';
import { Form, Input, Button } from '../Form';
import { Success } from '../Alerts';

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

  requestResetPassword(body) {
    api.post('/auth/reset', body).then(() => {
      this.setState({ success: true });
    });
  }

  render() {
    const { isValid, success } = this.state;

    return (
      <GuestMode className="RequestResetPassword">
        <Title name="Reset Password" />

        {success && <Success body="We have sent you an e-mail to reset your password." />}

        {!success && (
          <Form
            onValidationChange={(valid) => this.setState({ isValid: valid })}
            onSubmit={(body) => this.requestResetPassword(body)}
          >
            <div className="GuestMode__Label">To reset, please fill in your email:</div>
            <Input name="email" rules={['required', 'email']} placeholder="Email" className="RequestResetPassword__Input" icon="email" />
            <div className="RequestResetPassword__Button">
              <Button disabled={!isValid}>Reset password</Button>
            </div>
          </Form>
        )}
        <GoBack />
      </GuestMode>
    );
  }
}

export default RequestResetPassword;
