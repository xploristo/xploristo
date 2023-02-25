import { defineStore } from 'pinia';

import { useGroupStore } from './group.js';
import usersService from '../services/users.service.js';

export const useStudentStore = defineStore('student', {
  state: () => ({
    student: {
      role: 'student',
      email: null,
      firstName: null,
      lastName: null,
    },
  }),
  actions: {
    clear() {
      /* this.student._id = null; */
      this.student.role = 'student';
      this.student.email = null;
      this.student.firstName = null;
      this.student.lastName = null;
    },
    async getStudent(userId) {
      /* if (userId !== this.student._id) { */
      // TODO Send home (or not found page) if student not found
      this.student = await usersService.getUser(userId);
      /* } */
    },
    async createStudent({ email, firstName, lastName, role = 'student' }) {
      const groupStore = useGroupStore();
      await groupStore.addStudent({
        role,
        email,
        firstName,
        lastName,
      });

      this.student = {
        role,
        email,
        firstName,
        lastName,
      };
      return this.student;
    },
    async updateStudent(userId, { email, firstName, lastName }) {
      this.student = await usersService.updateUser(userId, {
        email,
        firstName,
        lastName,
      });

      const groupStore = useGroupStore();
      groupStore.updateStudent(userId, this.student);
    },
  },
  getters: {
    fullName(state) {
      return state.student.firstName + ' ' + state.student.lastName;
    },
    email(state) {
      return state.student.email;
    },
    firstName(state) {
      return state.student.firstName;
    },
    lastName(state) {
      return state.student.lastName;
    },
    role(state) {
      return state.student.role;
    },
  },
});
