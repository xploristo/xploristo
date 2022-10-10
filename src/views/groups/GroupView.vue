<template>
  <main>
    <!-- Tabs -->
    <div
      v-if="$hasPermissionTo('groups.edit')"
      class="mb-8 text-sm font-medium text-center text-gray-500 border-b border-gray-200"
    >
      <ul class="flex flex-wrap -mb-px">
        <!-- Group data tab -->
        <li class="mr-2">
          <a
            @click="changeActiveTab('group')"
            id="data-tab"
            :class="activeTab === 'group' ? 'active-tab' : 'inactive-tab'"
            >{{ $t('group.tabs.data') }}</a
          >
        </li>
        <!-- Students tab -->
        <li class="mr-2">
          <a
            @click="changeActiveTab('students')"
            id="students-tab"
            :class="activeTab === 'students' ? 'active-tab' : 'inactive-tab'"
            aria-current="page"
            >{{ $t('group.tabs.students') }}</a
          >
        </li>
        <!-- Assignments tab -->
        <li class="mr-2">
          <a
            @click="changeActiveTab('assignments')"
            id="assignments-tab"
            :class="activeTab === 'assignments' ? 'active-tab' : 'inactive-tab'"
            >{{ $t('group.tabs.assignments') }}</a
          >
        </li>
      </ul>
    </div>

    <!-- Tab content -->
    <div>
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script>
import { useGroupStore } from '../../stores/group';

export default {
  name: 'GroupView',
  props: {
    groupId: String,
  },
  computed: {
    activeTab() {
      return this.$route.meta.tabName;
    },
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  async created() {
    await this.groupStore.getGroup(this.groupId);
  },
  methods: {
    changeActiveTab(tab) {
      this.$router.push({ name: tab });
    },
  },
};
</script>
