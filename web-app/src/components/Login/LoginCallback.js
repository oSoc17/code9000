import React from 'react';
import { Redirect } from 'react-router-dom';

/* global window */
const setToken = (token) => {
  window.localStorage.setItem('jwt.token', token);
};

const LoginCallback = ({ match }) => {
  setToken(match.params.token);

  window.location = '/';

  return <Redirect to="/" />;
};

export default LoginCallback;
