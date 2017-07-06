/* global localStorage */
import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

const request = (endpoint, { headers = {}, body, ...otherOptions }, method) => {
  return axios(`${BASE_URL}${endpoint}`, {
    ...otherOptions,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('jwt.token')}}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: body ? JSON.stringify(body) : undefined,
    method,
  });
};

export const api = {
  get(endpoint, options = {}) {
    return request(endpoint, options, 'get');
  },
  post(endpoint, options = {}) {
    return request(endpoint, options, 'post');
  },
};

export default api;
