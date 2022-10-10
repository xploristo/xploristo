import { defineStore } from 'pinia';

import groupsService from '../services/groups.service.js';

const timeFormat = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
});

export const useAssignmentStore = defineStore('assignment', {
  // TODO Maintain data in local storage for unwanted refresh? 🤔
  state: () => ({
    assignment: {
      name: '',
      test: {},
      startDay: null,
      endDay: null,
      startTime: '00:00',
      endTime: '23:59',
    },
  }),
  actions: {
    clear() {
      /* this.assignment._id = null; */
      this.assignment.name = '';
      this.assignment.test = {};
      this.assignment.startDay = null;
      this.assignment.endDay = null;
      this.assignment.startTime = '00:00';
      this.assignment.endTime = '23:59';
    },
    async createAssignment(
      groupId,
      { name, testId, startDay, endDay, startTime, endTime }
    ) {
      const formatDate = (day, time) => {
        if (!day) return null;
        const date = new Date(day);
        const hour = time.split(':')[0];
        const minutes = time.split(':')[1];
        date.setHours(hour, minutes);
        return date;
      };
      const startDate = formatDate(startDay, startTime);
      const endDate = formatDate(endDay, endTime);
      const assignment = await groupsService.createAssignment(groupId, {
        name,
        testId,
        startDate,
        endDate,
      });
      this.assignment = assignment;
    },
    async updateAssignment(
      groupId,
      assignmentId,
      { name, startDay, endDay, startTime, endTime }
    ) {
      const formatDate = (day, time) => {
        if (!day) return null;
        const date = new Date(day);
        const hour = time.split(':')[0];
        const minutes = time.split(':')[1];
        date.setHours(hour, minutes);
        return date;
      };
      const startDate = formatDate(startDay, startTime);
      const endDate = formatDate(endDay, endTime);
      const assignment = await groupsService.updateAssignment(
        groupId,
        assignmentId,
        {
          name,
          startDate,
          endDate,
        }
      );
      this.assignment = assignment;
    },
    async getAssignment(groupId, assignmentId) {
      /* if (assignmentId !== this.assignment._id) { */
      // TODO Send home (or not found page) if assignment not found
      this.assignment = await groupsService.getAssignment(
        groupId,
        assignmentId
      );
      const { startDate, endDate } = this.assignment;
      const formatDay = (date) => {
        if (!date) return null;
        date = new Date(date);
        return (
          date.getFullYear() +
          '-' +
          timeFormat.format(date.getMonth()) +
          '-' +
          timeFormat.format(date.getDate())
        );
      };
      const formatTime = (date, defaultHour, defaultMinutes) => {
        if (!date) {
          return `${timeFormat.format(defaultHour)}:${timeFormat.format(
            defaultMinutes
          )}`;
        }
        date = new Date(date);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${timeFormat.format(hour)}:${timeFormat.format(minutes)}`;
      };
      this.assignment.startDay = formatDay(startDate);
      this.assignment.endDay = formatDay(endDate);
      this.assignment.startTime = formatTime(startDate, 0, 0);
      this.assignment.endTime = formatTime(endDate, 23, 59);
      /* } */
    },
  },
  getters: {
    name(state) {
      return state.assignment.name;
    },
    test(state) {
      return state.assignment.test;
    },
    testId(state) {
      return state.assignment.test._id;
    },
    startDay(state) {
      return state.assignment.startDay;
    },
    endDay(state) {
      return state.assignment.endDay;
    },
    startTime(state) {
      return state.assignment.startTime;
    },
    endTime(state) {
      return state.assignment.endTime;
    },
  },
});
