<template>
  <div>
    <StudentEditor :groupId="groupId" :userId="userId"></StudentEditor>
  </div>
</template>

<script>
import StudentEditor from '../../../components/groups/students/StudentEditor.vue';
import { useStudentStore } from '../../../stores/student';

export default {
  name: 'StudentView',
  components: {
    StudentEditor,
  },
  props: {
    groupId: { type: String, required: true },
    userId: { type: String, required: true },
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
