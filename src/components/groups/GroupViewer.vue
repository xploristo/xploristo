<script>
import AssignmentsTable from './assignments/AssignmentsTable.vue';
import { useGroupStore } from '../../stores/group.js';

export default {
  name: 'GroupViewer',
  components: {
    AssignmentsTable,
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    name() {
      return this.groupStore.name;
    },
    assignments() {
      return this.groupStore.assignments;
    },
  },
};
</script>

<template>
  <div>
    <div class="section-title">{{ name }}</div>
    <div class="sub-section-title">Assignments</div>
    <AssignmentsTable :assignments="assignments"></AssignmentsTable>
  </div>
</template>
