import { customFetch } from '../helpers/custom-fetch.js';

export default {
  login(email, password) {
    return customFetch('/auth', 'POST', {
      email,
      password,
    });
  },
  logout() {
    return customFetch('/auth', 'DELETE');
  },
};
