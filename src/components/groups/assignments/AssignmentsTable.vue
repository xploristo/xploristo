<script>
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';

import { useGroupStore } from '../../../stores/group.js';
import ConfirmModal from '../../modals/ConfirmModal.vue';
import DateMixin from '../../../mixins/parse-date.js';

export default {
  name: 'AssignmentsTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    CheckIcon,
    ConfirmModal,
  },
  mixins: [DateMixin],
  props: {
    assignments: { type: Array },
    groupId: { type: String },
  },
  data() {
    return {
      showDeleteModal: false,
      assignmentToDelete: {},
    };
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  methods: {
    confirmAssignmentDelete(assignment) {
      this.assignmentToDelete = assignment;
      this.showDeleteModal = true;
    },
    async deleteAssignment(assignmentId) {
      this.showDeleteModal = false;
      await this.groupStore.deleteAssignment(assignmentId);
    },
    completeTest(assignment) {
      if (assignment.result) {
        this.$router.push({
          name: 'result',
          params: { resultId: assignment.result._id },
        });
      } else {
        this.$router.push({
          name: 'assignmentTest',
          params: { assignmentId: assignment._id },
        });
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
          <th scope="col" class="py-3 px-6">Nombre</th>
          <th scope="col" class="py-3 px-6">Test</th>
          <th
            v-if="$hasPermissionTo('tests.edit')"
            scope="col"
            class="py-3 px-6"
          >
            Documento
          </th>
          <th scope="col" class="py-3 px-6">Fecha de inicio</th>
          <th scope="col" class="py-3 px-6">Fecha de fin</th>
          <th
            v-if="$hasPermissionTo('tests.complete')"
            scope="col"
            class="py-3 px-6"
          >
            Completado
          </th>
          <th
            v-if="$hasPermissionTo('tests.complete')"
            scope="col"
            class="py-3 px-6"
          >
            Puntuación
          </th>
          <th scope="col" class="py-3 px-6">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="assignment in assignments"
          v-bind:key="assignment._id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <!-- Name -->
          <td
            scope="row"
            class="py-4 px-6 whitespace-nowrap"
            :class="
              $hasPermissionTo('assignments.edit')
                ? 'text-blue-500'
                : 'text-gray-900'
            "
          >
            <RouterLink
              v-if="$hasPermissionTo('assignments.edit')"
              :to="{
                name: 'assignment',
                params: { assignmentId: assignment._id },
              }"
              class="font-medium"
              :class="'hover:text-blue-600'"
            >
              {{ assignment.name }}
            </RouterLink>
            <template v-else>{{ assignment.name }}</template>
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ assignment.test.name }}
          </td>

          <td
            v-if="$hasPermissionTo('tests.edit')"
            scope="row"
            class="py-4 px-6 text-gray-900 whitespace-nowrap"
          >
            {{ assignment.test.document.path }}
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ this.parseDate(assignment.startDate) }}
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ this.parseDate(assignment.endDate) }}
          </td>

          <!-- Completion date -->
          <td
            v-if="$hasPermissionTo('tests.complete')"
            scope="row"
            class="py-4 px-6 text-gray-900 whitespace-nowrap"
          >
            {{ this.parseDate(assignment.result?.createdAt) }}
          </td>

          <!-- Score -->
          <td
            v-if="$hasPermissionTo('tests.complete')"
            scope="row"
            class="py-4 px-6 text-gray-900 whitespace-nowrap"
          >
            <span v-if="assignment.result" class="flex"
              >{{ assignment.result.score }} ({{
                assignment.result.correctAnswersCount
              }}/{{ assignment.result.questions.length
              }}<CheckIcon class="pt-1 w-4 h-4"></CheckIcon>)</span
            >
          </td>

          <!-- Actions -->
          <td class="flex py-4 px-6">
            <RouterLink
              v-if="$hasPermissionTo('assignments.edit')"
              :to="{
                name: 'assignment',
                params: { assignmentId: assignment._id },
              }"
              class="text-blue-500 hover:text-blue-600"
            >
              <PencilSquareIcon class="mr-1 w-6 h-6"></PencilSquareIcon>
            </RouterLink>
            <TrashIcon
              v-if="$hasPermissionTo('assignments.delete')"
              @click="confirmAssignmentDelete(assignment)"
              class="text-red-500 hover:text-red-600 mr-1 w-6 h-6 cursor-pointer"
            ></TrashIcon>
            <button
              type="button"
              v-if="$hasPermissionTo('tests.complete')"
              @click="completeTest(assignment)"
              class="button-blue"
              :class="{
                'button-disabled':
                  !assignment.result && !this.isDateWithinInterval(assignment),
              }"
              :disabled="
                !assignment.result && !this.isDateWithinInterval(assignment)
              "
            >
              {{
                !!assignment.result ? $t('result.view') : $t('test.complete')
              }}
            </button>
          </td>
        </tr>
        <ConfirmModal
          v-if="showDeleteModal"
          title="assignment.delete.modal.title"
          :titleData="{ name: assignmentToDelete.name }"
          confirm="assignment.delete.modal.confirm"
          cancel="assignment.delete.modal.cancel"
          @confirm="deleteAssignment(assignmentToDelete._id)"
          @close="showDeleteModal = false"
        ></ConfirmModal>
      </tbody>
    </table>
  </div>
</template>
