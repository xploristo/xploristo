<script>
import { AcademicCapIcon } from '@heroicons/vue/24/outline';

import { useGroupStore } from '../../../stores/group.js';
import AssignmentsTable from '../../../components/groups/assignments/AssignmentsTable.vue';

export default {
  name: 'AssignmentsListView',
  components: {
    AcademicCapIcon,
    AssignmentsTable,
  },
  props: {
    groupId: { type: String, required: true },
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    assignments() {
      return this.groupStore.assignments;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="assignments?.length">
      <div v-if="$hasPermissionTo('assignments.create')" class="mt-4 mb-4">
        <button
          type="button"
          class="button-blue"
          @click="$router.push({ name: 'newAssignment' })"
        >
          {{ $t('assignment.create') }}
        </button>
      </div>

      <AssignmentsTable
        :assignments="assignments"
        :groupId="groupId"
      ></AssignmentsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('assignments.empty') }}
      </p>
      <button
        v-if="$hasPermissionTo('assignments.create')"
        type="button"
        class="button-blue w-auto self-center"
        @click="$router.push({ name: 'newAssignment' })"
      >
        {{ $t('assignment.create') }}
      </button>
      <AcademicCapIcon
        v-else
        class="w-16 h-16 text-gray-900 stroke-1"
      ></AcademicCapIcon>
    </div>
  </div>
</template>
