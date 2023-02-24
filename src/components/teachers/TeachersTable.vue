<script>
import {
  PencilSquareIcon,
  EnvelopeIcon,
  TrashIcon,
  WrenchIcon,
} from '@heroicons/vue/24/outline';

import authService from '../../services/auth.service';
import { useTeachersStore } from '../../stores/teachers.js';
import ConfirmModal from '../modals/ConfirmModal.vue';
import DateMixin from '../../mixins/parse-date.js';

export default {
  name: 'TeachersTable',
  components: {
    PencilSquareIcon,
    EnvelopeIcon,
    TrashIcon,
    WrenchIcon,
    ConfirmModal,
  },
  data() {
    return {
      showDeleteModal: false,
      showResendPasswordEmailModal: false,
      showChangeAdminStatusModal: false,
      teacherToActOn: {},
    };
  },
  setup() {
    const teachersStore = useTeachersStore();

    return { teachersStore };
  },
  mixins: [DateMixin],
  props: {
    teachers: { type: Array },
  },
  methods: {
    confirmTeacherDelete(teacher) {
      this.teacherToActOn = teacher;
      this.showDeleteModal = true;
    },
    confirmResendPasswordEmail(teacher) {
      this.teacherToActOn = teacher;
      this.showResendPasswordEmailModal = true;
    },
    confirmChangeAdminStatus(teacher) {
      this.teacherToActOn = teacher;
      this.showChangeAdminStatusModal = true;
    },
    async deleteTeacher(teacherId) {
      this.showDeleteModal = false;
      await this.teachersStore.deleteTeacher(teacherId);
    },
    async resendPasswordEmail(teacherId) {
      await authService.resetPassword({ userId: teacherId });
      // TODO Show confirm
    },
    async changeAdminStatus(teacher) {
      this.showChangeAdminStatusModal = false;
      if (teacher.role === 'admin') {
        await this.teachersStore.updateTeacherRole(teacher._id, 'teacher');
      } else {
        await this.teachersStore.updateTeacherRole(teacher._id, 'admin');
      }
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
            {{ $t('teachers.table.admin') }}
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
          <td scope="row" class="py-4 px-6 text-blue-500 whitespace-nowrap">
            <RouterLink
              :to="'/teachers/' + teacher._id"
              class="font-medium hover:text-blue-600"
            >
              {{ teacher.firstName }}
            </RouterLink>
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ teacher.lastName }}
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ teacher.email }}
          </td>
          <td
            scope="row"
            class="py-4 px-6 text-gray-900 whitespace-nowrap"
            :class="{ 'text-green-400': teacher.role === 'admin' }"
          >
            {{
              teacher.role === 'admin'
                ? $t('teachers.table.adminYes')
                : $t('teachers.table.adminNo')
            }}
          </td>
          <td class="flex py-4 px-6">
            <RouterLink
              :to="'/teachers/' + teacher._id"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon class="mr-1 w-6 h-6"></PencilSquareIcon>
            </RouterLink>
            <EnvelopeIcon
              @click="confirmResendPasswordEmail(teacher)"
              class="text-blue-500 hover:text-blue-600 mr-1 w-6 h-6 cursor-pointer"
            >
            </EnvelopeIcon>
            <WrenchIcon
              @click="confirmChangeAdminStatus(teacher)"
              class="mr-1 w-6 h-6 cursor-pointer"
              :class="
                teacher.role === 'admin'
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-blue-500 hover:text-blue-600'
              "
            ></WrenchIcon>
            <TrashIcon
              @click="confirmTeacherDelete(teacher)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
            <!-- TODO Tooltips -->
          </td>
        </tr>

        <!-- Confirm delete modal -->
        <ConfirmModal
          v-if="showDeleteModal"
          title="teacher.delete.modal.title"
          :titleData="{
            name: `${teacherToActOn.firstName} ${teacherToActOn.lastName}`,
          }"
          confirm="teacher.delete.modal.confirm"
          cancel="teacher.delete.modal.cancel"
          @confirm="deleteTeacher(teacherToActOn._id)"
          @close="showDeleteModal = false"
        ></ConfirmModal>

        <!-- Confirm resend password email modal -->
        <ConfirmModal
          v-if="showResendPasswordEmailModal"
          title="teacher.resendPasswordEmail.modal.title"
          :titleData="{
            name: `${teacherToActOn.firstName} ${teacherToActOn.lastName}`,
          }"
          confirm="teacher.resendPasswordEmail.modal.confirm"
          cancel="teacher.resendPasswordEmail.modal.cancel"
          @confirm="resendPasswordEmail(teacherToActOn._id)"
          @close="showResendPasswordEmailModal = false"
        ></ConfirmModal>

        <!-- Confirm change admin status modal -->
        <ConfirmModal
          v-if="showChangeAdminStatusModal"
          :title="
            teacherToActOn.role === 'admin'
              ? 'teacher.unsetAdmin.modal.title'
              : 'teacher.setAdmin.modal.title'
          "
          :titleData="{
            name: `${teacherToActOn.firstName} ${teacherToActOn.lastName}`,
          }"
          :confirm="
            teacherToActOn.role === 'admin'
              ? 'teacher.unsetAdmin.modal.confirm'
              : 'teacher.setAdmin.modal.confirm'
          "
          :cancel="
            teacherToActOn.role === 'admin'
              ? 'teacher.unsetAdmin.modal.cancel'
              : 'teacher.setAdmin.modal.cancel'
          "
          @confirm="changeAdminStatus(teacherToActOn)"
          @close="showChangeAdminStatusModal = false"
        ></ConfirmModal>
      </tbody>
    </table>
  </div>
</template>
