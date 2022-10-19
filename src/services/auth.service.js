import { customFetch } from '../helpers/custom-fetch.js';

export default {
  setPassword(oldPassword, password) {
    return customFetch('/auth/password', 'PUT', {
      oldPassword,
      password,
    });
  },
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
