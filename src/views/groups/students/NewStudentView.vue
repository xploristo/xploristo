<template>
  <div>
    <div class="section-title">{{ $t('student.new') }}</div>
    <StudentEditor :groupId="groupId"></StudentEditor>
  </div>
</template>

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
