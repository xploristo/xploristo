<script>
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

import { useGroupsStore } from '../../stores/groups.js';
import ConfirmModal from '../modals/ConfirmModal.vue';
import DateMixin from '../../mixins/parse-date.js';

export default {
  name: 'GroupsTable',
  components: {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    ConfirmModal,
  },
  mixins: [DateMixin],
  props: {
    groups: { type: Array },
  },
  data() {
    return {
      showDeleteModal: false,
      groupToDelete: {},
    };
  },
  setup() {
    const groupsStore = useGroupsStore();

    return { groupsStore };
  },
  methods: {
    confirmGroupDelete(group) {
      this.groupToDelete = group;
      this.showDeleteModal = true;
    },
    async deleteGroup(groupId) {
      this.showDeleteModal = false;
      await this.groupsStore.deleteGroup(groupId);
    },
  },
};
</script>

<template>
  <div class="overflow-x-auto relative sm:rounded-lg">
    <!-- TODO Search input -->

    <!-- Table -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">{{ $t('groups.table.name') }}</th>
          <th
            v-if="$hasPermissionTo('groups.edit')"
            scope="col"
            class="py-3 px-6"
          >
            {{ $t('groups.table.isVisible') }}
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('groups.table.editedAt') }}
          </th>
          <th scope="col" class="py-3 px-6">{{ $t('groups.table.action') }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Group -->
        <tr
          v-for="group in groups"
          v-bind:key="group._id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td scope="row" class="py-4 px-6 text-blue-500 whitespace-nowrap">
            <RouterLink
              :to="'/groups/' + group._id"
              class="font-medium hover:text-blue-600"
            >
              {{ group.name }}
            </RouterLink>
          </td>

          <!-- Visible to students -->
          <td
            v-if="$hasPermissionTo('groups.edit')"
            scope="row"
            class="py-4 px-6 whitespace-nowrap"
            :class="group.isVisible ? 'text-gray-900' : 'text-red-500'"
          >
            {{
              group.isVisible
                ? $t('groups.table.visibleYes')
                : $t('groups.table.visibleNo')
            }}
          </td>

          <!-- Update date -->
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ this.parseDate(group.updatedAt) }}
          </td>

          <!-- Edit -->
          <td class="flex py-4 px-6">
            <RouterLink
              :to="'/groups/' + group._id"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon
                v-if="$hasPermissionTo('groups.edit')"
                class="mr-1 w-6 h-6"
              ></PencilSquareIcon>
              <EyeIcon v-else class="mr-1 w-6 h-6"></EyeIcon>
            </RouterLink>
            <TrashIcon
              v-if="$hasPermissionTo('groups.delete')"
              @click="confirmGroupDelete(group)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
          </td>
        </tr>

        <ConfirmModal
          v-if="showDeleteModal"
          title="group.delete.modal.title"
          :titleData="{ name: groupToDelete.name }"
          confirm="group.delete.modal.confirm"
          cancel="group.delete.modal.cancel"
          @confirm="deleteGroup(groupToDelete._id)"
          @close="showDeleteModal = false"
        ></ConfirmModal>
      </tbody>
    </table>
  </div>
</template>
