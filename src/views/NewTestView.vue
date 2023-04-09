<script>
import TestEditor from '../components/tests/TestEditor.vue';
import { useTestStore } from '../stores/test.js';

export default {
  name: 'NewTestView',
  components: {
    TestEditor,
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  async mounted() {
    await this.testStore.clear();
  },
};
</script>

<template>
  <div>
    <TestEditor action="create"></TestEditor>
  </div>
</template>
