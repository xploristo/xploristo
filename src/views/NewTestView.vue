<template>
  <div>
    <div class="section-title">{{ $t('test.new') }}</div>
    <test-editor action="create"></test-editor>
  </div>
</template>

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
