// @flow

import config from './config';

const api = (urlSuffix: string): Promise<Array<any>> => {
  const url = `${config.API_URL}/${urlSuffix}`;

  return fetch(url, {
    method: 'GET',
    headers: config.HEADERS
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error(`${response.statusText} ${response.url}`);
  });
};

export default api;

export const apiPost = (urlSuffix: string, data: any): Promise<Array<any>> => {
  const url = `${config.API_URL}${urlSuffix}`;

  return fetch(url, {
    method: 'POST',
    headers: config.HEADERS,
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error(`${response.statusText} ${response.url}`);
  });
};
