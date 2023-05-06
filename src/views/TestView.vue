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
    assignmentId: String,
    groupId: String,
  },
};
</script>

<template>
  <main>
    <template v-if="$hasPermissionTo('tests.edit')">
      <TestEditor
        :testId="testId"
        :assignmentId="assignmentId"
        :groupId="groupId"
        action="update"
      ></TestEditor>
    </template>
    <template v-else>
      <!-- FIXME Does this ever happen? Students go through AssignmentTestView -->
      <TestViewer :testId="testId"></TestViewer>
    </template>
  </main>
</template>
