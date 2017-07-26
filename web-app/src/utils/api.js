/* global window */
import axios from 'axios';

import redirect from './redirect';

export const BASE_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return window.localStorage.getItem('jwt.token');
};

const setToken = ({ newToken }) => {
  window.localStorage.setItem('jwt.token', newToken);
};

export const removeToken = () => {
  window.localStorage.removeItem('jwt.token');
};

const abstractRequest = (endpoint, { headers = {}, body, ...otherOptions }, method) => {
  return axios(`${BASE_URL}${endpoint}`, {
    ...otherOptions,
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: body ? JSON.stringify(body) : undefined,
    method,
  });
};

const checkForRefreshToken = (endpoint, content, method) => (error) => {
  if (error.response && error.response.status === 401 && getToken()) {
    return abstractRequest('/auth/refresh', {}, 'post').then(({ data }) => {
      setToken(data);

      return abstractRequest(endpoint, content, method);
    });
  }
  return Promise.reject(error);
};

const checkForRelogin = error => {
  if (!error.response || !error.response.data || window.location.pathname === '/login') {
    return Promise.reject(error.response);
  }

  const message = error.response.data.error;

  if (['token_expired', 'token_invalid', 'token_not_provided', 'token_blacklisted', 'user_not_found'].includes(message)) {
    redirect('/login');
  }

  return Promise.reject(error.response);
};

const request = (endpoint, content, method) => {
  return abstractRequest(endpoint, content, method)
    .catch(checkForRefreshToken(endpoint, content, method))
    .catch(checkForRelogin);
};

export const api = {
  get(endpoint, options = {}) {
    return request(endpoint, options, 'get');
  },
  post(endpoint, options = {}) {
    return request(endpoint, options, 'post');
  },
  put(endpoint, options = {}) {
    return request(endpoint, options, 'put');
  },
};

export default api;
