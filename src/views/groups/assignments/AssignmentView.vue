<script>
import { useAssignmentStore } from '../../../stores/assignment';

export default {
  name: 'AssignmentView',
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
  async created() {
    await this.assignmentStore.getAssignment(this.groupId, this.assignmentId);
  },
};
</script>

<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>
