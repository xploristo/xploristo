<template>
  <div>
    <div v-if="tests?.length">
      <div v-if="$hasPermissionTo('tests.create')" class="mt-4 mb-4">
        <button
          type="button"
          class="button-blue"
          @click="$router.push({ name: 'newTest' })"
        >
          {{ $t('test.create') }}
        </button>
      </div>

      <TestsTable :tests="tests"></TestsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('tests.empty') }}
      </p>
      <button
        v-if="$hasPermissionTo('tests.create')"
        type="button"
        class="button-blue w-auto self-center"
        @click="$router.push({ name: 'newTest' })"
      >
        {{ $t('test.create') }}
      </button>
      <FolderOpenIcon
        v-else
        class="w-16 h-16 text-gray-900 stroke-1"
      ></FolderOpenIcon>
    </div>
  </div>
</template>

<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import testsService from '../services/tests.service.js';
import TestsTable from '../components/tests/TestsTable.vue';

export default {
  name: 'TestsView',
  components: {
    FolderOpenIcon,
    TestsTable,
  },
  data() {
    return {
      tests: [],
    };
  },
  async mounted() {
    this.tests = await testsService.getTests();
  },
};
</script>
