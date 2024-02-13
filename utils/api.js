import { BASE_URL, STRAPI_TOK } from './urls';

export const fetchDataFromAPI = async (endpoint) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + STRAPI_TOK,
    },
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
};

export const makePaymentReq = async (endpoint, payload) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + STRAPI_TOK,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
