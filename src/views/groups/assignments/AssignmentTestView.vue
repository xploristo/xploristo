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
};
</script>

<template>
  <div>
    <TestViewer
      :assignmentId="assignmentId"
      :groupId="groupId"
      :isPreview="$hasPermissionTo('assignments.edit')"
    ></TestViewer>
  </div>
</template>
