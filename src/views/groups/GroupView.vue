<script>
import TopBar from '../../components/nav/TopBar.vue';
import { useGroupStore } from '../../stores/group';

export default {
  name: 'GroupView',
  components: {
    TopBar,
  },
  props: {
    groupId: String,
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  async created() {
    await this.groupStore.getGroup(this.groupId);
  },
  computed: {
    activeTab() {
      return this.$route.meta.tabName;
    },
    groupName() {
      return this.groupStore.name;
    },
  },
  methods: {
    changeActiveTab(tab) {
      this.$router.push({ name: tab });
    },
  },
};
</script>

<template>
  <main>
    <TopBar
      :title="$t('group.title') + ': ' + groupName"
      :backRoute="$route.meta.tabName !== 'results' && '/groups'"
    ></TopBar>

    <div class="section">
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
              :class="
                activeTab === 'assignments' ? 'active-tab' : 'inactive-tab'
              "
              >{{ $t('group.tabs.assignments') }}</a
            >
          </li>
          <!-- Results tab -->
          <li class="mr-2">
            <a
              @click="changeActiveTab('results')"
              id="results-tab"
              :class="activeTab === 'results' ? 'active-tab' : 'inactive-tab'"
              >{{ $t('group.tabs.results') }}</a
            >
          </li>
        </ul>
      </div>

      <!-- Tab content -->
      <div>
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>
