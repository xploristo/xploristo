<template>
  <div class="overflow-x-auto relative sm:rounded-lg">
    <!-- TODO Search input -->

    <!-- Table -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-3 px-6">Examen</th>
          <th scope="col" class="py-3 px-6">Nombre</th>
          <th scope="col" class="py-3 px-6">Apellidos</th>
          <th scope="col" class="py-3 px-6">Completado</th>
          <th scope="col" class="py-3 px-6">Puntuación</th>
          <th scope="col" class="py-3 px-6">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="result in results"
          v-bind:key="result._id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td scope="row" class="py-4 px-6 text-blue-500 whitespace-nowrap">
            <RouterLink
              :to="'/results/' + result._id"
              class="font-medium hover:text-blue-600"
            >
              {{ result.assignment.name }}
            </RouterLink>
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ result.user.firstName }}
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ result.user.lastName }}
          </td>
          <!-- TODO Translate date -->
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ new Date(result.createdAt).toDateString() }}
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            <span class="flex"
              >{{ result.score }} ({{ result.correctAnswersCount }}/{{
                result.questions.length
              }}<CheckIcon class="pt-1 w-4 h-4"></CheckIcon>)</span
            >
          </td>
          <td class="flex py-4 px-6">
            <RouterLink
              :to="'/results/' + result._id"
              class="text-blue-500 hover:text-blue-600"
            >
              <EyeIcon class="mr-1 w-6 h-6"></EyeIcon>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CheckIcon, EyeIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'ResultsTable',
  components: {
    CheckIcon,
    EyeIcon,
  },
  props: {
    results: { type: Array },
  },
};
</script>
