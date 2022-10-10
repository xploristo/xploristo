<script>
import AssignmentEditor from '../../../components/groups/assignments/AssignmentEditor.vue';

export default {
  name: 'AssignmentDataView',
  components: {
    AssignmentEditor,
  },
  props: {
    groupId: { type: String, required: true },
    assignmentId: { type: String, required: true },
  },
};
</script>

<template>
  <div>
    <AssignmentEditor
      v-if="$hasPermissionTo('assignments.edit')"
      :groupId="groupId"
      :assignmentId="assignmentId"
    ></AssignmentEditor>
  </div>
</template>
