<script>
import { CheckIcon, EyeIcon } from '@heroicons/vue/24/outline';
import DateMixin from '../../../mixins/parse-date.js';

export default {
  name: 'ResultsTable',
  components: {
    CheckIcon,
    EyeIcon,
  },
  mixins: [DateMixin],
  props: {
    results: { type: Array },
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
            {{ $t('results.table.assignment') }}
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('results.table.firstName') }}
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('results.table.lastName') }}
          </th>
          <th scope="col" class="py-3 px-6">
            {{ $t('results.table.completed') }}
          </th>
          <th scope="col" class="py-3 px-6">{{ $t('results.table.score') }}</th>
          <th scope="col" class="py-3 px-6">
            {{ $t('results.table.action') }}
          </th>
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
              :to="{
                name: 'result',
                params: { resultId: result._id },
              }"
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
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            {{ this.parseDate(result.createdAt) }}
          </td>
          <td scope="row" class="py-4 px-6 text-gray-900 whitespace-nowrap">
            <span class="flex"
              >{{ +Number(result.score).toFixed(2) }} ({{
                result.correctAnswersCount
              }}/{{ result.questions.length
              }}<CheckIcon class="pt-1 w-4 h-4"></CheckIcon>)</span
            >
          </td>
          <td class="flex py-4 px-6">
            <RouterLink
              :to="{
                name: 'result',
                params: { resultId: result._id },
              }"
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
