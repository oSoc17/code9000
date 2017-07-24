/* global window */
export default (path) => {
  window.location = `${process.env.PUBLIC_URL}${path}`;
};
