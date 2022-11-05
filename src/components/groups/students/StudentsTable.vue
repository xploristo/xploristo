<template>
  <div class="overflow-x-auto relative sm:rounded-lg">
    <!-- TODO Search input -->

    <!-- Table -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">Nombre</th>
          <th scope="col" class="py-3 px-6">Apellidos</th>
          <th scope="col" class="py-3 px-6">Correo electrónico</th>
          <th scope="col" class="py-3 px-6">Acción</th>
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
            <TrashIcon
              @click="confirmStudentDelete(student)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
          </td>
        </tr>
        <ConfirmModal
          v-if="showDeleteModal"
          title="student.delete.modal.title"
          :titleData="{ name: studentToDelete.firstName }"
          confirm="student.delete.modal.confirm"
          cancel="student.delete.modal.cancel"
          @confirm="deleteStudent(studentToDelete._id)"
          @close="showDeleteModal = false"
        ></ConfirmModal>
      </tbody>
    </table>
  </div>
</template>

<script>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import usersService from '../../../services/users.service';
import ConfirmModal from '../../modals/ConfirmModal.vue';

export default {
  name: 'StudentsTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    ConfirmModal,
  },
  data() {
    return {
      showDeleteModal: false,
      studentToDelete: {},
    };
  },
  props: {
    students: { type: Array },
    groupId: { type: String, required: true },
  },
  methods: {
    confirmStudentDelete(student) {
      this.studentToDelete = student;
      this.showDeleteModal = true;
    },
    async deleteStudent(studentId) {
      this.showDeleteModal = false;
      await usersService.deleteUser(studentId, this.groupId);
      // Reload page
      // TODO Remove student from table without reloading
      this.$router.go(0);
    },
  },
};
</script>
