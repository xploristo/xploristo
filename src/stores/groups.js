import { defineStore } from 'pinia';

import groupsService from '../services/groups.service.js';

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groupsList: [],
  }),
  actions: {
    async getGroups() {
      this.groupsList = await groupsService.getGroups();
    },
    async deleteGroup(groupId) {
      await groupsService.deleteGroup(groupId);

      this.groupsList = this.groupsList.filter((t) => t._id !== groupId);
    },
  },
  getters: {
    groups(state) {
      return state.groupsList;
    },
  },
});
