import { customFetch } from '../helpers/custom-fetch.js';

export default {
  getUserProfile() {
    return customFetch('/users/profile', 'GET');
  },
};
