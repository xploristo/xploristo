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

<template>
  <main>
    <template v-if="$hasPermissionTo('tests.edit')">
      <TestEditor :testId="testId" action="update"></TestEditor>
    </template>
    <template v-else>
      <TestViewer :testId="testId"></TestViewer>
    </template>
  </main>
</template>
