import { customFetch } from '../helpers/custom-fetch.js';

export default {
  getUser(userId) {
    return customFetch(`/users/${userId}`, 'GET');
  },
  createUser(userData) {
    return customFetch('/users', 'POST', userData);
  },
  updateUser(userId, userData) {
    return customFetch(`/users/${userId}`, 'PUT', userData);
  },
  deleteUser(userId, groupId) {
    return customFetch(
      `/users/${userId}${(groupId && `?groupId=${groupId}`) || ''}`,
      'DELETE'
    );
  },
  getUserProfile() {
    return customFetch('/users/profile', 'GET');
  },
};
