<script>
import StudentEditor from '../../../components/groups/students/StudentEditor.vue';
import { useStudentStore } from '../../../stores/student';

export default {
  name: 'NewStudentView',
  components: {
    StudentEditor,
  },
  props: {
    groupId: { type: String },
  },
  setup() {
    const studentStore = useStudentStore();

    return { studentStore };
  },
  async mounted() {
    await this.studentStore.clear();
  },
};
</script>

<template>
  <div>
    <StudentEditor :groupId="groupId" action="create"></StudentEditor>
  </div>
</template>
