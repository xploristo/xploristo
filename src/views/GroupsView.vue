<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import { useGroupsStore } from '../stores/groups.js';
import GroupsTable from '../components/groups/GroupsTable.vue';

export default {
  name: 'GroupsView',
  components: {
    FolderOpenIcon,
    GroupsTable,
  },
  setup() {
    const groupsStore = useGroupsStore();

    return { groupsStore };
  },
  async created() {
    await this.groupsStore.getGroups();
  },
  computed: {
    groups() {
      return this.groupsStore.groups;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="groups?.length">
      <div v-if="$hasPermissionTo('groups.create')" class="mt-4 mb-4">
        <button
          type="button"
          class="button-blue"
          @click="$router.push({ name: 'newGroup' })"
        >
          {{ $t('group.create') }}
        </button>
      </div>

      <GroupsTable :groups="groups"></GroupsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('groups.empty') }}
      </p>
      <button
        v-if="$hasPermissionTo('groups.create')"
        type="button"
        class="button-blue w-auto self-center"
        @click="$router.push({ name: 'newGroup' })"
      >
        {{ $t('group.create') }}
      </button>
      <FolderOpenIcon
        v-else
        class="w-16 h-16 text-gray-900 stroke-1"
      ></FolderOpenIcon>
    </div>
  </div>
</template>
