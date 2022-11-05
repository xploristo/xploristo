import { customFetch } from '../helpers/custom-fetch.js';

export default {
  createTeacher(teacherData) {
    return customFetch('/users', 'POST', teacherData);
  },
  getTeachers() {
    // TODO Paginate
    return customFetch('/users/teachers?admins=true');
  },
  getTeacher(teacherId) {
    return customFetch(`/users/${teacherId}`);
  },
  updateTeacher(teacherId, teacherData) {
    return customFetch(`/users/${teacherId}`, 'PUT', teacherData);
  },
  updateTeacherRole(teacherId, role) {
    return customFetch(`/users/${teacherId}/role`, 'PUT', { role });
  },
  deleteTeacher(teacherId) {
    return customFetch(`/users/${teacherId}`, 'DELETE');
  },
};
