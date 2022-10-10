<template>
  <template v-if="$hasPermissionTo('groups.edit')">
    <GroupEditor :groupId="groupId" :action="'update'"></GroupEditor>
  </template>
  <template v-else>
    <GroupViewer :groupId="groupId"></GroupViewer>
  </template>
</template>

<script>
import GroupEditor from '../../components/groups/GroupEditor.vue';
import GroupViewer from '../../components/groups/GroupViewer.vue';

export default {
  name: 'GroupDataView',
  components: {
    GroupEditor,
    GroupViewer,
  },
  props: {
    groupId: { type: String, required: true },
  },
};
</script>
