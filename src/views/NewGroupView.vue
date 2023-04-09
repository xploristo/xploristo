<script>
import GroupEditor from '../components/groups/GroupEditor.vue';
import TopBar from '../components/nav/TopBar.vue';
import { useGroupStore } from '../stores/group.js';

export default {
  name: 'NewGroupView',
  components: {
    GroupEditor,
    TopBar,
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

<template>
  <div>
    <TopBar :title="$t('group.new')"></TopBar>
    <GroupEditor action="create"></GroupEditor>
  </div>
</template>
