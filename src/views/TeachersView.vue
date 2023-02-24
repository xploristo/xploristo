<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import { useTeachersStore } from '../stores/teachers.js';
import TeachersTable from '../components/teachers/TeachersTable.vue';

export default {
  name: 'TeachersView',
  components: {
    FolderOpenIcon,
    TeachersTable,
  },
  setup() {
    const teachersStore = useTeachersStore();

    return { teachersStore };
  },
  async created() {
    await this.teachersStore.getTeachers();
  },
  computed: {
    teachers() {
      return this.teachersStore.teachers;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="teachers?.length">
      <div v-if="$hasPermissionTo('teachers.create')" class="mt-4 mb-4">
        <button
          type="button"
          class="button-blue"
          @click="$router.push({ name: 'newTeacher' })"
        >
          {{ $t('teacher.create') }}
        </button>
      </div>

      <TeachersTable :teachers="teachers"></TeachersTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('teachers.empty') }}
      </p>
      <button
        v-if="$hasPermissionTo('teachers.create')"
        type="button"
        class="button-blue w-auto self-center"
        @click="$router.push({ name: 'newTeacher' })"
      >
        {{ $t('teacher.create') }}
      </button>
      <FolderOpenIcon
        v-else
        class="w-16 h-16 text-gray-900 stroke-1"
      ></FolderOpenIcon>
    </div>
  </div>
</template>
