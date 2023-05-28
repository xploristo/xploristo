<script>
import { UserPlusIcon, TrashIcon } from '@heroicons/vue/24/outline';

import InputModal from '../modals/InputModal.vue';
import ConfirmModal from '../modals/ConfirmModal.vue';
import SpinnerIcon from '../icons/SpinnerIcon.vue';

import { useGroupStore } from '../../stores/group.js';
import groupsService from '../../services/groups.service';

export default {
  name: 'GroupEditor',
  components: {
    InputModal,
    ConfirmModal,
    SpinnerIcon,
    UserPlusIcon,
    TrashIcon,
  },
  props: {
    groupId: { type: String },
    action: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      showAddTeacherModal: false,
      showDeleteTeacherModal: false,
      teacherToActOn: null,
    };
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    name: {
      get() {
        return this.groupStore.name;
      },
      set(value) {
        this.groupStore.group.name = value;
      },
    },
    isVisible: {
      get() {
        return this.groupStore.isVisible;
      },
      set(value) {
        this.groupStore.group.isVisible = value;
      },
    },
    teachers() {
      return this.groupStore.teachers;
    },
    submitDisabled() {
      return !this.name.length;
    },
  },
  methods: {
    async addTeacher(teacherEmail) {
      this.loading = true;
      try {
        await this.groupStore.addTeacher(teacherEmail);
      } finally {
        this.loading = false;
        this.showAddTeacherModal = false;
      }
    },
    confirmTeacherDelete(teacher) {
      // TODO Show a warning if last teacher or trying to delete themselves and not and admin
      this.teacherToActOn = teacher;
      this.showDeleteTeacherModal = true;
    },
    async deleteTeacher(teacherId) {
      this.showDeleteTeacherModal = false;
      this.loading = true;
      try {
        await this.groupStore.deleteTeacher(teacherId);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      this.loading = true;
      try {
        if (this.action === 'create') {
          const group = await this.groupStore.createGroup({
            name: this.name,
            isVisible: this.isVisible,
          });

          this.$router.push({ name: 'group', params: { groupId: group._id } });
        } else {
          // TODO Use store
          await groupsService.updateGroup(this.groupId, {
            name: this.name,
            isVisible: this.isVisible,
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <label for="name" class="input-label">{{ $t('group.form.name') }}</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="text-input"
        :placeholder="$t('group.form.name')"
        required
      />

      <template v-if="action === 'update'">
        <label for="teachers" class="input-label mt-4">{{
          $t('group.form.teachers')
        }}</label>
        <div
          class="flex mt-4 mb-4 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8"
        >
          <div class="flex-auto">
            <p
              v-if="!teachers?.length"
              class="w-full mt-2 text-center text-gray-500"
            >
              {{ $t('group.form.teachersEmpty') }}
            </p>
            <table v-else class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    {{ $t('teachers.table.firstName') }}
                  </th>
                  <th scope="col" class="py-3 px-6">
                    {{ $t('teachers.table.lastName') }}
                  </th>
                  <th scope="col" class="py-3 px-6">
                    {{ $t('teachers.table.email') }}
                  </th>
                  <th scope="col" class="py-3 px-6">
                    {{ $t('teachers.table.action') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="teacher in teachers"
                  v-bind:key="teacher._id"
                  class="bg-white border-b hover:bg-gray-50"
                >
                  <td
                    scope="row"
                    class="py-4 px-6 text-gray-900 whitespace-nowrap"
                  >
                    {{ teacher.firstName }}
                  </td>
                  <td
                    scope="row"
                    class="py-4 px-6 text-gray-900 whitespace-nowrap"
                  >
                    {{ teacher.lastName }}
                  </td>
                  <td
                    scope="row"
                    class="py-4 px-6 text-gray-900 whitespace-nowrap"
                  >
                    {{ teacher.email }}
                  </td>
                  <td class="flex py-4 px-6">
                    <TrashIcon
                      @click="confirmTeacherDelete(teacher)"
                      class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
                    ></TrashIcon>
                    <!-- TODO Tooltip -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex-none">
            <UserPlusIcon
              aria-hidden="true"
              class="mt-2 ml-4 icon-medium-blue cursor-pointer hover:text-blue-600"
              @click="showAddTeacherModal = true"
            ></UserPlusIcon>
          </div>
        </div>
      </template>

      <div class="flex items-center">
        <input
          id="is-visible"
          type="checkbox"
          :value="true"
          v-model="isVisible"
          class="checkbox"
        />
        <label for="is-visible" class="checkbox-label">{{
          $t('group.form.isVisible')
        }}</label>
      </div>

      <div class="mt-4">
        <button
          type="submit"
          :disabled="submitDisabled"
          class="button-blue mb-4"
          :class="{
            'button-disabled': submitDisabled,
            'button-loading': loading,
          }"
        >
          <SpinnerIcon v-if="loading"></SpinnerIcon>
          {{ action === 'create' ? $t('group.create') : $t('group.save') }}
        </button>
      </div>
    </form>

    <InputModal
      v-if="showAddTeacherModal"
      inputLabel="group.form.addTeacherModal.inputLabel"
      inputType="email"
      submitLabel="group.form.addTeacherModal.submitLabel"
      :loading="loading"
      @submitted="addTeacher"
      @close="showAddTeacherModal = false"
    ></InputModal>

    <!-- Confirm delete modal -->
    <ConfirmModal
      v-if="showDeleteTeacherModal"
      title="group.form.deleteTeacherModal.title"
      :titleData="{
        name: `${teacherToActOn.firstName} ${teacherToActOn.lastName}`,
      }"
      confirm="teacher.delete.modal.confirm"
      cancel="teacher.delete.modal.cancel"
      @confirm="deleteTeacher(teacherToActOn._id)"
      @close="showDeleteTeacherModal = false"
    ></ConfirmModal>
  </div>
</template>
