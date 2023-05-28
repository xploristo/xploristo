import { defineStore } from 'pinia';

import { useGroupStore } from './group.js';
import groupsService from '../services/groups.service.js';

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    assignment: {
      _id: null,
      name: '',
      test: {},
      startDay: null,
      endDay: null,
      startTime: '00:00',
      endTime: '23:59',
      resultCount: 0,
    },
  }),
  actions: {
    clear() {
      this.assignment._id = null;
      this.assignment.name = '';
      this.assignment.test = {};
      this.assignment.startDay = null;
      this.assignment.endDay = null;
      this.assignment.startTime = '00:00';
      this.assignment.endTime = '23:59';
      this.assignment.resultCount = 0;
    },
    async getAssignment(groupId, assignmentId) {
      if (assignmentId !== this.assignment._id) {
        // TODO Send home (or not found page) if assignment not found
        this.assignment = await groupsService.getAssignment(
          groupId,
          assignmentId
        );
        const { startDate, endDate } = this.assignment;
        this.assignment.startDay = _formatDay(startDate);
        this.assignment.endDay = _formatDay(endDate);
        this.assignment.startTime = _formatTime(startDate, 0, 0);
        this.assignment.endTime = _formatTime(endDate, 23, 59);
      }
    },
    async getTestDocumentDownloadUrl(groupId, assignmentId) {
      if (
        assignmentId !== this.assignment._id ||
        !this.assignment.test?.documentDownloadUrl
      ) {
        this.assignment.test.documentDownloadUrl =
          await groupsService.getAssignmentTestDocumentDownloadUrl(
            groupId,
            assignmentId
          );
      }

      return this.assignment.test.documentDownloadUrl;
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

      const groupStore = useGroupStore();
      this.assignment = await groupStore.createAssignment({
        name,
        testId,
        startDate,
        endDate,
      });
    },
    async updateAssignment(
      groupId,
      assignmentId,
      { name, startDay, endDay, startTime, endTime }
    ) {
      const startDate = _formatDate(startDay, startTime);
      const endDate = _formatDate(endDay, endTime);

      const groupStore = useGroupStore();
      this.assignment = await groupStore.updateAssignment(assignmentId, {
        name,
        startDate,
        endDate,
      });
    },
    async updateAssignmentTest(groupId, assignmentId, { name, questions }) {
      const groupStore = useGroupStore();
      this.assignment = await groupStore.updateAssignmentTest(assignmentId, {
        name,
        questions,
      });
    },
    async updateAssignmentTestDocument(groupId, assignmentId, document) {
      const groupStore = useGroupStore();
      this.assignment = await groupStore.updateAssignmentTestDocument(
        assignmentId,
        document
      );
      return this.assignment;
    },
    async resetAssignmentTest(assignmentId, templateId) {
      const groupStore = useGroupStore();
      this.assignment = await groupStore.resetAssignmentTest(
        assignmentId,
        templateId
      );
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
    resultCount(state) {
      return state.assignment.resultCount;
    },
  },
});

const timeFormat = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
});

function _formatDate(day, time) {
  if (!day) return null;
  const date = new Date(day);
  const hour = time.split(':')[0];
  const minutes = time.split(':')[1];
  date.setHours(hour, minutes);
  return date;
}

function _formatDay(date) {
  if (!date) return null;
  date = new Date(date);
  return (
    date.getFullYear() +
    '-' +
    timeFormat.format(date.getMonth()) +
    '-' +
    timeFormat.format(date.getDate())
  );
}

function _formatTime(date, defaultHour, defaultMinutes) {
  if (!date) {
    return `${timeFormat.format(defaultHour)}:${timeFormat.format(
      defaultMinutes
    )}`;
  }
  date = new Date(date);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${timeFormat.format(hour)}:${timeFormat.format(minutes)}`;
}
