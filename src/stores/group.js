import { defineStore } from 'pinia';

import groupsService from '../services/groups.service.js';
import usersService from '../services/users.service.js';

export const useGroupStore = defineStore('group', {
  state: () => ({
    group: {
      _id: null,
      name: '',
      teachers: [],
      students: [],
      assignments: [],
      results: [],
    },
  }),
  actions: {
    clear() {
      this.group._id = null;
      this.group.name = '';
      this.group.teachers = [];
      this.group.students = [];
      this.group.assignments = [];
      this.group.results = [];
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

      let results = [];
      this.group.assignments.forEach((assignment) => {
        if (assignment.results?.length) {
          assignment.results = assignment.results.map((result) => {
            return { ...result, assignment: { name: assignment.name } };
          });
          results = [...results, ...assignment.results];
        }
      });
      this.group.results = results;
      /* } */
    },
    async addTeacher(teacherEmail) {
      this.group = await groupsService.addTeacher(this.group._id, {
        teacherEmail,
      });
    },
    async deleteTeacher(teacherId) {
      this.group = await groupsService.deleteTeacher(this.group._id, teacherId);
    },
    async addStudent({ email, firstName, lastName, role = 'student' }) {
      this.group = await groupsService.enrollStudents(this.group._id, {
        students: [
          {
            role,
            email,
            firstName,
            lastName,
          },
        ],
      });
    },
    updateStudent(studentId, studentData) {
      // Actual update is made in student store, this only updates table data
      const index = this.group.students.findIndex((s) => s._id === studentId);
      this.group.students[index] = studentData;
    },
    async deleteStudent(studentId) {
      await usersService.deleteUser(studentId, this.group._id);
      this.group.students = this.group.students.filter(
        (s) => s._id !== studentId
      );
    },
    async createAssignment({ name, testId, startDate, endDate, isVisible }) {
      const assignment = await groupsService.createAssignment(this.group._id, {
        name,
        testId,
        startDate,
        endDate,
        isVisible,
      });

      this.group.assignments.push(assignment); // TODO Unshift?

      return assignment;
    },
    async updateAssignment(
      assignmentId,
      { name, startDate, endDate, isVisible }
    ) {
      const assignment = await groupsService.updateAssignment(
        this.group._id,
        assignmentId,
        {
          name,
          startDate,
          endDate,
          isVisible,
        }
      );

      const index = this.group.assignments.findIndex(
        (a) => a._id === assignmentId
      );
      this.group.assignments[index] = assignment;

      return assignment;
    },
    async updateAssignmentTest(assignmentId, { name, questions }) {
      const assignment = await groupsService.updateAssignmentTest(
        this.group._id,
        assignmentId,
        {
          name,
          questions,
        }
      );

      const index = this.group.assignments.findIndex(
        (a) => a._id === assignmentId
      );
      this.group.assignments[index] = assignment;

      return assignment;
    },
    async updateAssignmentTestDocument(assignmentId, document) {
      const assignment = await groupsService.updateAssignmentTestDocument(
        this.group._id,
        assignmentId,
        document
      );

      const index = this.group.assignments.findIndex(
        (a) => a._id === assignmentId
      );
      this.group.assignments[index] = assignment;

      return assignment;
    },
    async resetAssignmentTest(assignmentId, templateId) {
      const assignment = await groupsService.resetAssignmentTest(
        this.group._id,
        assignmentId,
        templateId
      );

      const index = this.group.assignments.findIndex(
        (a) => a._id === assignmentId
      );
      this.group.assignments[index] = assignment;

      return assignment;
    },
    async deleteAssignment(assignmentId) {
      await groupsService.deleteAssignment(this.group._id, assignmentId);
      this.group.assignments = this.group.assignments.filter(
        (a) => a._id !== assignmentId
      );
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
    results(state) {
      return state.group.results;
    },
  },
});
