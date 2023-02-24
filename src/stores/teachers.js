import { defineStore } from 'pinia';

import teachersService from '../services/teachers.service.js';

export const useTeachersStore = defineStore('teachers', {
  state: () => ({
    teachersList: [],
  }),
  actions: {
    async getTeachers() {
      this.teachersList = await teachersService.getTeachers();
    },
    async deleteTeacher(teacherId) {
      await teachersService.deleteTeacher(teacherId);

      this.teachersList = this.teachersList.filter((t) => t._id !== teacherId);
    },
    async updateTeacherRole(teacherId, role) {
      await teachersService.updateTeacherRole(teacherId, role);

      const index = this.teachersList.findIndex((t) => t._id === teacherId);
      this.teachersList[index].role = role;
    },
  },
  getters: {
    teachers(state) {
      return state.teachersList;
    },
  },
});
