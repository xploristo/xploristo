import { defineStore } from 'pinia';

import groupsService from '../services/groups.service.js';

export const useGroupStore = defineStore('group', {
  // TODO Maintain data in local storage for unwanted refresh? 🤔
  state: () => ({
    group: {
      name: '',
      teachers: [],
      students: [],
      assignments: [],
    },
  }),
  actions: {
    clear() {
      /* this.group._id = null; */
      this.group.name = '';
      this.group.teachers = [];
      this.group.students = [];
      this.group.assignments = [];
    },
    async createGroup({ name, teachers, students }) {
      const groupData = await groupsService.createGroup({
        name,
        teachers,
        students,
      });
      this.group = groupData;

      return groupData;
    },
    async getGroup(groupId) {
      /* if (groupId !== this.group._id) { */
      // TODO Send home (or not found page) if group not found
      this.group = await groupsService.getGroup(groupId);
      /* } */
    },
    addTeacher(email) {
      this.group.teachers.push({ email });
    },
    deleteTeacher(teacherIndex) {
      this.group.teachers.splice(teacherIndex, 1);
      this.group.teachers.forEach((teacher, index) => {
        teacher.index = index;
      });
    },
    addStudent(email) {
      this.group.students.push({ email });
    },
    deleteStudent(studentIndex) {
      this.group.students.splice(studentIndex, 1);
      this.group.students.forEach((student, index) => {
        student.index = index;
      });
    },
  },
  getters: {
    name(state) {
      return state.group.name;
    },
    teachers(state) {
      return state.group.teachers;
    },
    students(state) {
      return state.group.students;
    },
    assignments(state) {
      return state.group.assignments;
    },
  },
});
