import React, { Component } from 'react';

import Title from '../Title';
import GuestMode, { GoBack } from '../GuestMode';
import { Form, Input, Button } from '../Form';
import { Success, Errors } from '../Alerts';

import api from '../../utils/api';

import './ResetPassword.css';

class RequestResetPassword extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      isValid: false,
      success: false,
      error: false,
    };
  }

  requestResetPassword(body) {
    const token = this.props.match.params.token;

    api.post(`/auth/reset/${token}`, body).then(() => {
      this.setState({ success: true });
    })
    .catch(() => {
      this.setState({ error: true });
    });
  }

  render() {
    const { isValid, success, error } = this.state;

    return (
      <GuestMode className="ResetPassword">
        <Title name="Reset Password" />

        {success && <Success body="We have reset your password." />}

        {error && <Errors errors={['Sorry. Something whent wrong!']} />}


        {!success && (
          <Form
            onValidationChange={(valid) => this.setState({ isValid: valid })}
            onSubmit={(body) => this.requestResetPassword(body)}
          >
            <div className="GuestMode__Label">Fill in your new password:</div>
            <Input
              type="password"
              name="password"
              rules={['required', 'password']}
              placeholder="Password"
              className="ResetPassword__Input"
              icon="lock"
            />
            <div className="ResetPassword__Button">
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
