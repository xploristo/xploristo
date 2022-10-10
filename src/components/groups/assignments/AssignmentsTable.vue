<script>
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';
import groupsService from '../../../services/groups.service';
import DeleteModal from '../../modals/DeleteModal.vue';

export default {
  name: 'AssignmentsTable',
  components: {
    PencilSquareIcon,
    TrashIcon,
    CheckIcon,
    DeleteModal,
  },
  data() {
    return {
      showDeleteModal: false,
      assignmentToDelete: {},
    };
  },
  props: {
    assignments: { type: Array },
    groupId: { type: String, required: true },
  },
  methods: {
    confirmAssignmentDelete(assignment) {
      this.assignmentToDelete = assignment;
      this.showDeleteModal = true;
    },
    async deleteAssignment(assignmentId) {
      this.showDeleteModal = false;
      await groupsService.deleteAssignment(this.groupId, assignmentId);
      // Reload page
      // TODO Remove assignment from table without reloading
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
              :to="{
                name: 'assignment',
                params: { assignmentId: assignment._id },
              }"
              class="font-medium"
              :class="
                $hasPermissionTo('assignments.edit') && 'hover:text-blue-600'
              "
            >
              {{ assignment.name }}
            </RouterLink>
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
            {{
              assignment.startDate &&
              new Date(assignment.startDate).toDateString()
            }}
          </td>

          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{
              assignment.endDate && new Date(assignment.endDate).toDateString()
            }}
          </td>

          <!-- Completion date -->
          <td
            v-if="$hasPermissionTo('tests.complete')"
            scope="row"
            class="py-4 px-6 text-gray-900 whitespace-nowrap"
          >
            {{
              assignment.result?.createdAt &&
              new Date(assignment.result.createdAt).toDateString()
            }}
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
              @click="
                () =>
                  $router.push({
                    name: 'assignmentTest',
                    params: { assignmentId: assignment._id },
                  })
              "
              class="button-blue"
              :class="{
                'button-disabled': !!assignment.result,
              }"
              :disabled="!!assignment.result"
            >
              {{ $t('test.complete') }}
            </button>
          </td>
        </tr>
        <DeleteModal
          v-if="showDeleteModal"
          title="assignment.delete.modal.title"
          :titleData="{ name: assignmentToDelete.name }"
          confirm="assignment.delete.modal.confirm"
          cancel="assignment.delete.modal.cancel"
          @confirm="deleteAssignment(assignmentToDelete._id)"
          @close="showDeleteModal = false"
        ></DeleteModal>
      </tbody>
    </table>
  </div>
</template>
