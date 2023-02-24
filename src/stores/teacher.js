import { defineStore } from 'pinia';

import teachersService from '../services/teachers.service.js';

export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    teacher: {
      role: 'teacher',
      email: null,
      firstName: null,
      lastName: null,
    },
  }),
  actions: {
    clear() {
      /* this.teacher._id = null; */
      this.teacher.role = 'teacher';
      this.teacher.email = null;
      this.teacher.firstName = null;
      this.teacher.lastName = null;
    },
    async createTeacher({ email, firstName, lastName, role = 'teacher' }) {
      const teacherData = await teachersService.createTeacher({
        email,
        firstName,
        lastName,
        role,
      });
      this.teacher = teacherData;

      return teacherData;
    },
    async getTeacher(teacherId) {
      /* if (teacherId !== this.teacher._id) { */
      // TODO Send home (or not found page) if teacher not found
      this.teacher = await teachersService.getTeacher(teacherId);
      /* } */
    },
  },
  getters: {
    fullName(state) {
      return state.teacher.firstName + ' ' + state.teacher.lastName;
    },
    email(state) {
      return state.teacher.email;
    },
    firstName(state) {
      return state.teacher.firstName;
    },
    lastName(state) {
      return state.teacher.lastName;
    },
    role(state) {
      return state.teacher.role;
    },
  },
});
