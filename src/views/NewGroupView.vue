<template>
  <div>
    <div class="section-title">{{ $t('group.new') }}</div>
    <GroupEditor action="create"></GroupEditor>
  </div>
</template>

<script>
import GroupEditor from '../components/groups/GroupEditor.vue';
import { useGroupStore } from '../stores/group.js';
export default {
  name: 'NewGroupView',
  components: {
    GroupEditor,
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  async mounted() {
    await this.groupStore.clear();
  },
};
</script>
