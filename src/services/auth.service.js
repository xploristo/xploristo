import { customFetch } from '../helpers/custom-fetch.js';

export default {
  setPassword(oldPassword, password, confirmPassword) {
    return customFetch('/auth/password', 'PUT', {
      oldPassword,
      password,
      confirmPassword,
    });
  },
  resetPassword({ userId, email }) {
    let path =
      '/auth/password' + (userId ? `?userId=${userId}` : `?email=${email}`);

    return customFetch(path, 'DELETE');
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
