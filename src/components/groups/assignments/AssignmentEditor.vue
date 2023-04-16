<script>
import { EyeIcon, CalendarIcon, ClockIcon } from '@heroicons/vue/24/outline';

import { useAssignmentStore } from '../../../stores/assignment.js';
import testsService from '../../../services/tests.service.js';
import SpinnerIcon from '../../icons/SpinnerIcon.vue';
import TopBar from '../../nav/TopBar.vue';

// TODO Add option to shuffle questions and/or answers for students

export default {
  name: 'AssignmentEditor',
  components: {
    EyeIcon,
    CalendarIcon,
    ClockIcon,
    SpinnerIcon,
    TopBar,
  },
  props: {
    assignmentId: { type: String },
    groupId: { type: String },
  },
  data() {
    return {
      testId: null,
      loading: false,
      tests: [],
    };
  },
  setup() {
    const assignmentStore = useAssignmentStore();

    return { assignmentStore };
  },
  async created() {
    if (this.assignmentId) {
      await this.assignmentStore.getAssignment(this.groupId, this.assignmentId);
    } else {
      // Creating new assignment
      this.assignmentStore.clear();
      this.tests = await testsService.getTests();
    }
  },
  computed: {
    name: {
      get() {
        return this.assignmentStore.name;
      },
      set(value) {
        this.assignmentStore.assignment.name = value;
      },
    },
    startDay: {
      get() {
        return this.assignmentStore.startDay;
      },
      set(value) {
        this.assignmentStore.assignment.startDay = value;
      },
    },
    endDay: {
      get() {
        return this.assignmentStore.endDay;
      },
      set(value) {
        this.assignmentStore.assignment.endDay = value;
      },
    },
    startTime: {
      get() {
        return this.assignmentStore.startTime;
      },
      set(value) {
        this.assignmentStore.assignment.startTime = value;
      },
    },
    endTime: {
      get() {
        return this.assignmentStore.endTime;
      },
      set(value) {
        this.assignmentStore.assignment.endTime = value;
      },
    },
    test() {
      return this.assignmentStore.test;
    },
    submitDisabled() {
      return !this.name.length || (!this.testId && !this.test);
    },
  },
  methods: {
    async submit() {
      if (this.assignmentId) {
        // TODO Do this via store
        this.loading = true;
        await this.assignmentStore.updateAssignment(
          this.groupId,
          this.assignmentId,
          {
            name: this.name,
            startDay: this.startDay,
            endDay: this.endDay,
            startTime: this.startTime,
            endTime: this.endTime,
          }
        );

        // TODO Show feedback instead of routing
        this.$router.push({ name: 'assignments' });
      } else {
        this.loading = true;
        await this.assignmentStore.createAssignment(this.groupId, {
          name: this.name,
          testId: this.testId,
          startDay: this.startDay,
          endDay: this.endDay,
          startTime: this.startTime,
          endTime: this.endTime,
        });

        // TODO Assignment view?
        this.$router.push({ name: 'assignments' });
      }
    },
  },
};
</script>

<template>
  <div>
    <TopBar
      :title="$t('assignment.' + (assignmentId ? 'update' : 'new'))"
      :isSubsection="true"
    ></TopBar>

    <div class="subsection">
      <form @submit.prevent="submit">
        <!-- Name -->
        <label for="name" class="input-label">{{
          $t('assignment.form.name')
        }}</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="text-input mb-4"
          :placeholder="$t('assignment.form.name')"
          required
        />

        <!-- Test -->
        <label
          for="test"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Test</label
        >
        <template v-if="assignmentId">
          <div id="test" class="flex mt-2 mb-2">
            <div class="p-2 w-full rounded-lg border border-gray-300">
              {{ test.name }}
            </div>
            <RouterLink
              v-if="test?._id"
              :to="{
                name: 'test',
                params: { testId: test._id },
              }"
              class="text-blue-500 hover:text-blue-600"
            >
              <EyeIcon class="ml-2 mt-1 w-8 h-8"></EyeIcon>
            </RouterLink>
          </div>
        </template>
        <template v-else>
          <select
            id="test"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
            v-model="testId"
          >
            <option selected :value="null">Selecciona un test</option>
            <option
              v-for="test in tests"
              v-bind:key="test._id"
              :value="test._id"
            >
              {{ test.name }}
            </option>
          </select>
        </template>

        <!-- Start date -->
        <label
          for="startDate"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Fecha de inicio</label
        >
        <div class="flex mb-4">
          <CalendarIcon
            class="w-11 h-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
          ></CalendarIcon>

          <input
            type="date"
            id="startDay"
            v-model="startDay"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 mr-4"
          />

          <ClockIcon
            class="w-11 h-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
          ></ClockIcon>

          <input
            type="time"
            id="startTime"
            v-model="startTime"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
            min="00:00"
            max="23:59"
          />
        </div>

        <!-- End date -->
        <label
          for="endDate"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Fecha de fin</label
        >
        <div class="flex mb-4">
          <CalendarIcon
            class="w-11 h-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
          ></CalendarIcon>

          <input
            type="date"
            id="endDay"
            v-model="endDay"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 mr-4"
          />

          <ClockIcon
            class="w-11 h-11 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300"
          ></ClockIcon>

          <input
            type="time"
            id="endTime"
            v-model="endTime"
            class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
            min="00:00"
            max="23:59"
          />
        </div>

        <template v-if="!!assignmentId">
          <!-- TODO Teachers list and input -->
        </template>

        <!-- TODO Students' emails input -->

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
            {{ assignmentId ? $t('assignment.save') : $t('assignment.create') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
