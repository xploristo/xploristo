<script>
import TestViewer from '../../../components/tests/TestViewer.vue';
import { useAssignmentStore } from '../../../stores/assignment';

export default {
  name: 'AssignmentTestView',
  components: {
    TestViewer,
  },
  props: {
    groupId: {
      type: String,
      required: true,
    },
    assignmentId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const assignmentStore = useAssignmentStore();

    return { assignmentStore };
  },
  computed: {
    testId() {
      return this.assignmentStore.testId;
    },
  },
};
</script>

<template>
  <div>
    <TestViewer
      v-if="testId"
      :testId="testId"
      :assignmentId="assignmentId"
      :groupId="groupId"
    ></TestViewer>
  </div>
</template>
