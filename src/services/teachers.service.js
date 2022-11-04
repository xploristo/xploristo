import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createTeacher(teacherData) {
    return customFetch('/users', 'POST', teacherData);
  },
  getTeachers() {
    // TODO Paginate
    return customFetch('/users/teachers');
  },
  getTeacher(teacherId) {
    return customFetch(`/users/${teacherId}`);
  },
  updateTeacher(teacherId, teacherData) {
    return customFetch(`/users/${teacherId}`, 'PUT', teacherData);
  },
  deleteTeacher(teacherId) {
    return customFetch(`/users/${teacherId}`, 'DELETE');
  },
};
