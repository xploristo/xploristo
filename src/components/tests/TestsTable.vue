<template>
  <div class="overflow-x-auto relative sm:rounded-lg">
    <!-- TODO Search input -->

    <!-- Table -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">Test</th>
          <th scope="col" class="py-3 px-6">Documento</th>
          <th scope="col" class="py-3 px-6">Fecha de última edición</th>
          <th scope="col" class="py-3 px-6">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="test in tests"
          v-bind:key="test._id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
          >
            <RouterLink :to="'/tests/' + test._id" class="hover:text-blue-600">
              {{ test.name }}
            </RouterLink>
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ test.document.path }}
          </td>
          <!-- TODO Translate date -->
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ new Date(test.updatedAt).toDateString() }}
          </td>
          <td class="flex py-4 px-6">
            <RouterLink
              :to="'/tests/' + test._id"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon class="mr-1 w-6 h-6"></PencilSquareIcon>
            </RouterLink>
            <TrashIcon
              @click="confirmTestDelete(test)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
          </td>
        </tr>
        <DeleteModal
          v-if="showDeleteModal"
          title="test.delete.modal.title"
          :titleData="{ name: testToDelete.name }"
          confirm="test.delete.modal.confirm"
          cancel="test.delete.modal.cancel"
          @confirm="deleteTest(testToDelete._id)"
          @close="showDeleteModal = false"
        ></DeleteModal>
      </tbody>
    </table>
  </div>
</template>

<script>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import testsService from '../../services/tests.service';
import DeleteModal from '../modals/DeleteModal.vue';

export default {
  name: 'TestsTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    DeleteModal,
  },
  data() {
    return {
      showDeleteModal: false,
      testToDelete: {},
    };
  },
  props: {
    tests: { type: Array },
  },
  methods: {
    confirmTestDelete(test) {
      this.testToDelete = test;
      this.showDeleteModal = true;
    },
    async deleteTest(testId) {
      this.showDeleteModal = false;
      await testsService.deleteTest(testId);
      // Reload page
      // TODO Remove test from table without reloading
      this.$router.go(0);
    },
  },
};
</script>
