<script>
import TeacherEditor from '../components/teachers/TeacherEditor.vue';
import { useTeacherStore } from '../stores/teacher.js';

export default {
  name: 'NewTeacherView',
  components: {
    TeacherEditor,
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
    <TeacherEditor action="create"></TeacherEditor>
  </div>
</template>
