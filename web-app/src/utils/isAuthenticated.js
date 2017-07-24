/* global window */
const isAuthenticated = () => {
  const token = window.localStorage.getItem('jwt.token');

  return token !== undefined && token !== null;
};

export default isAuthenticated;
