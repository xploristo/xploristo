<template>
  <div>
    <div class="section-title">{{ $t('assignment.new') }}</div>
    <AssignmentEditor :groupId="groupId"></AssignmentEditor>
  </div>
</template>

<script>
import AssignmentEditor from '../../../components/groups/assignments/AssignmentEditor.vue';
import { useAssignmentStore } from '../../../stores/assignment';

export default {
  name: 'NewAssignmentView',
  components: {
    AssignmentEditor,
  },
  props: {
    groupId: { type: String },
  },
  setup() {
    const assignmentStore = useAssignmentStore();

    return { assignmentStore };
  },
  async mounted() {
    await this.assignmentStore.clear();
  },
};
</script>
