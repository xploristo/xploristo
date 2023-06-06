<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import AssignmentsTable from './assignments/AssignmentsTable.vue';
import { useGroupStore } from '../../stores/group.js';

export default {
  name: 'GroupViewer',
  components: {
    FolderOpenIcon,
    AssignmentsTable,
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    name() {
      return this.groupStore.name;
    },
    assignments() {
      return this.groupStore.assignments;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="assignments?.length">
      <div class="sub-section-title">{{ $t('group.tabs.assignments') }}</div>
      <AssignmentsTable :assignments="assignments"></AssignmentsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('assignments.empty') }}
      </p>
      <FolderOpenIcon class="w-16 h-16 text-gray-900 stroke-1"></FolderOpenIcon>
    </div>
  </div>
</template>
