<script>
import {
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
} from '@heroicons/vue/24/outline';

import { useGroupStore } from '../../../stores/group.js';
import authService from '../../../services/auth.service';
import ConfirmModal from '../../modals/ConfirmModal.vue';

export default {
  name: 'StudentsTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    EnvelopeIcon,
    ConfirmModal,
  },
  props: {
    students: { type: Array },
    groupId: { type: String, required: true },
  },
  data() {
    return {
      showDeleteModal: false,
      showResendPasswordEmailModal: false,
      studentToActOn: {},
    };
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  methods: {
    confirmStudentDelete(student) {
      this.studentToActOn = student;
      this.showDeleteModal = true;
    },
    confirmResendPasswordEmail(student) {
      this.studentToActOn = student;
      this.showResendPasswordEmailModal = true;
    },
    async deleteStudent(studentId) {
      this.showDeleteModal = false;
      await this.groupStore.deleteStudent(studentId);
    },
    async resendPasswordEmail(studentId) {
      this.showResendPasswordEmailModal = false;
      await authService.resetPassword({ userId: studentId });
      // TODO Show confirm
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
            {{ $t('students.table.firstName') }}
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('students.table.lastName') }}
          </th>
          <th scope="col" class="py-3 px-6">
            C{{ $t('students.table.email') }}o
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('students.table.action') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          v-bind:key="student._id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <!-- Name -->
          <td scope="row" class="py-4 px-6 text-blue-500 whitespace-nowrap">
            <RouterLink
              :to="{
                name: 'student',
                params: { userId: student._id },
              }"
              class="font-medium hover:text-blue-600"
            >
              {{ student.firstName }}
            </RouterLink>
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ student.lastName }}
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ student.email }}
          </td>

          <td class="flex py-4 px-6">
            <RouterLink
              :to="{
                name: 'student',
                params: { userId: student._id },
              }"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon class="mr-1 w-6 h-6"></PencilSquareIcon>
            </RouterLink>
            <EnvelopeIcon
              @click="confirmResendPasswordEmail(student)"
              class="text-blue-500 hover:text-blue-600 mr-1 w-6 h-6 cursor-pointer"
            >
            </EnvelopeIcon>
            <TrashIcon
              @click="confirmStudentDelete(student)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
          </td>
        </tr>

        <!-- Confirm delete modal -->
        <ConfirmModal
          v-if="showDeleteModal"
          title="student.delete.modal.title"
          :titleData="{ name: studentToActOn.firstName }"
          confirm="student.delete.modal.confirm"
          cancel="student.delete.modal.cancel"
          @confirm="deleteStudent(studentToActOn._id)"
          @close="showDeleteModal = false"
        ></ConfirmModal>

        <!-- Confirm resend password email modal -->
        <ConfirmModal
          v-if="showResendPasswordEmailModal"
          title="student.resendPasswordEmail.modal.title"
          :titleData="{
            name: `${studentToActOn.firstName} ${studentToActOn.lastName}`,
          }"
          confirm="student.resendPasswordEmail.modal.confirm"
          cancel="student.resendPasswordEmail.modal.cancel"
          @confirm="resendPasswordEmail(studentToActOn._id)"
          @close="showResendPasswordEmailModal = false"
        ></ConfirmModal>
      </tbody>
    </table>
  </div>
</template>
