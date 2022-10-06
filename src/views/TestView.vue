<template>
  <main>
    <template v-if="$hasPermissionTo('test.edit')">
      <test-editor :testId="testId" :action="'update'"></test-editor>
    </template>
    <template v-else>
      <test-viewer :testId="testId"></test-viewer>
    </template>
  </main>
</template>

<script>
import TestEditor from '../components/tests/TestEditor.vue';
import TestViewer from '../components/tests/TestViewer.vue';

export default {
  name: 'TestView',
  components: {
    TestEditor,
    TestViewer,
  },
  props: {
    testId: String,
  },
};
</script>
