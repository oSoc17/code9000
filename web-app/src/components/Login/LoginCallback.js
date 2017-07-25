import redirect from '../../utils/redirect';

/* global window */
const setToken = (token) => {
  window.localStorage.setItem('jwt.token', token);
};

const LoginCallback = ({ match }) => {
  setToken(match.params.token);

  redirect('/');

  return null;
};

export default LoginCallback;
