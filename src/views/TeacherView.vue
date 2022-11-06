<script>
import TeacherEditor from '../components/teachers/TeacherEditor.vue';
import { useTeacherStore } from '../stores/teacher.js';

export default {
  name: 'TeacherView',
  components: {
    TeacherEditor,
  },
  props: {
    teacherId: { type: String, required: true },
  },
  setup() {
    const teacherStore = useTeacherStore();

    return { teacherStore };
  },
  async mounted() {
    await this.teacherStore.clear();
  },
};
</script>

<template>
  <div>
    <TeacherEditor :teacherId="teacherId" action="update"></TeacherEditor>
  </div>
</template>
