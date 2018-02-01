// @flow

const API_URL = process.env.REACT_APP_API_URL || '';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const config = {
  API_URL,
  HEADERS
};

export default config;
