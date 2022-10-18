<template>
  <div>
    <div v-if="results?.length">
      <ResultsTable :results="results"></ResultsTable>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <p class="text-center mb-6 text-base font-normal text-gray-900 sm:px-16">
        {{ $t('results.empty') }}
      </p>
      <FolderOpenIcon class="w-16 h-16 text-gray-900 stroke-1"></FolderOpenIcon>
    </div>
  </div>
</template>

<script>
import { FolderOpenIcon } from '@heroicons/vue/24/outline';

import { useGroupStore } from '../../../stores/group.js';
import ResultsTable from '../../../components/groups/results/ResultsTable.vue';

export default {
  name: 'ResultsListView',
  components: {
    FolderOpenIcon,
    ResultsTable,
  },
  props: {
    groupId: { type: String, required: true },
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    results() {
      return this.groupStore.results;
    },
  },
};
</script>
