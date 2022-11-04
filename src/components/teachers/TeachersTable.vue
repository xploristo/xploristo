<script>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import teachersService from '../../services/teachers.service.js';
import DeleteModal from '../modals/DeleteModal.vue';
import DateMixin from '../../mixins/parse-date.js';

export default {
  name: 'TeachersTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    DeleteModal,
  },
  data() {
    return {
      showDeleteModal: false,
      teacherToDelete: {},
    };
  },
  mixins: [DateMixin],
  props: {
    teachers: { type: Array },
  },
  methods: {
    confirmTeacherDelete(teacher) {
      this.teacherToDelete = teacher;
      this.showDeleteModal = true;
    },
    async deleteTeacher(teacherId) {
      this.showDeleteModal = false;
      await teachersService.deleteTeacher(teacherId);
      // Reload page
      // TODO Remove teacher from table without reloading
      this.$router.go(0);
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
          <td class="flex py-4 px-6">
            <RouterLink
              :to="'/teachers/' + teacher._id"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon class="mr-1 w-6 h-6"></PencilSquareIcon>
            </RouterLink>
            <TrashIcon
              @click="confirmTeacherDelete(teacher)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
          </td>
        </tr>

        <DeleteModal
          v-if="showDeleteModal"
          title="teacher.delete.modal.title"
          :titleData="{
            name: `${teacherToDelete.firstName} ${teacherToDelete.lastName}`,
          }"
          confirm="teacher.delete.modal.confirm"
          cancel="teacher.delete.modal.cancel"
          @confirm="deleteTeacher(teacherToDelete._id)"
          @close="showDeleteModal = false"
        ></DeleteModal>
      </tbody>
    </table>
  </div>
</template>
