import { defineStore } from 'pinia';

import usersService from '../services/users.service.js';
import groupsService from '../services/groups.service.js';

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
    async createStudent(
      groupId,
      { email, firstName, lastName, role = 'student' }
    ) {
      const studentData = await groupsService.enrollStudents(groupId, {
        students: [
          {
            email,
            firstName,
            lastName,
            role,
          },
        ],
      });
      this.student = studentData;

      return studentData;
    },
    async getStudent(userId) {
      /* if (userId !== this.student._id) { */
      // TODO Send home (or not found page) if student not found
      this.student = await usersService.getUser(userId);
      /* } */
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
