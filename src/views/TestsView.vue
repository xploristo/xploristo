<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import { useTestsStore } from '../stores/tests.js';
import TestsTable from '../components/tests/TestsTable.vue';

export default {
  name: 'TestsView',
  components: {
    FolderOpenIcon,
    TestsTable,
  },
  setup() {
    const testsStore = useTestsStore();

    return { testsStore };
  },
  async created() {
    await this.testsStore.getTests();
  },
  computed: {
    tests() {
      return this.testsStore.tests;
    },
  },
};
</script>

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
