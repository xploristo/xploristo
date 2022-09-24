import { customFetch } from '../helpers/custom-fetch.js';

export default {
  login(email, password) {
    return customFetch('/auth', 'POST', {
      email,
      password,
    });
  },
};
