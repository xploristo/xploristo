<template>
  <div>
    <div v-if="students?.length">
      <div v-if="$hasPermissionTo('students.create')" class="mt-4 mb-4">
        <button
          type="button"
          class="button-blue"
          @click="$router.push({ name: 'newStudent' })"
        >
          {{ $t('student.create') }}
        </button>
      </div>

      <StudentsTable :students="students" :groupId="groupId"></StudentsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('students.empty') }}
      </p>
      <button
        v-if="$hasPermissionTo('students.create')"
        type="button"
        class="button-blue w-auto self-center"
        @click="$router.push({ name: 'newStudent' })"
      >
        {{ $t('student.create') }}
      </button>
      <UserIcon v-else class="w-16 h-16 text-gray-900 stroke-1"></UserIcon>
    </div>
  </div>
</template>

<script>
import { UserIcon } from '@heroicons/vue/24/outline';

import { useGroupStore } from '../../../stores/group.js';
import StudentsTable from '../../../components/groups/students/StudentsTable.vue';

export default {
  name: 'StudentsListView',
  components: {
    UserIcon,
    StudentsTable,
  },
  props: {
    groupId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    students() {
      return this.groupStore.students;
    },
  },
};
</script>
