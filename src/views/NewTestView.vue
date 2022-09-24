<template>
  <div>
    <div class="test-title">{{ $t('test.new') }}</div>
    <test-editor action="create"></test-editor>
  </div>
</template>

<script>
import TestEditor from '../components/tests/TestEditor.vue';

export default {
  name: 'NewTestView',
  components: {
    TestEditor,
  },
};
</script>
