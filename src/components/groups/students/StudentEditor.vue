<script>
import { useStudentStore } from '../../../stores/student.js';

import SpinnerIcon from '../../icons/SpinnerIcon.vue';
import TopBar from '../../nav/TopBar.vue';

export default {
  name: 'StudentEditor',
  components: {
    SpinnerIcon,
    TopBar,
  },
  props: {
    userId: { type: String },
    groupId: { type: String, required: true },
    action: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
    };
  },
  setup() {
    const studentStore = useStudentStore();

    return { studentStore };
  },
  async created() {
    if (this.userId) {
      await this.studentStore.getStudent(this.userId);
    }
  },
  computed: {
    email: {
      get() {
        return this.studentStore.email;
      },
      set(value) {
        this.studentStore.student.email = value;
      },
    },
    firstName: {
      get() {
        return this.studentStore.firstName;
      },
      set(value) {
        this.studentStore.student.firstName = value;
      },
    },
    lastName: {
      get() {
        return this.studentStore.lastName;
      },
      set(value) {
        this.studentStore.student.lastName = value;
      },
    },
    submitDisabled() {
      return !this.email;
    },
  },
  methods: {
    async submit() {
      if (this.action === 'create') {
        this.loading = true;
        await this.studentStore.createStudent({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        });

        this.$router.push({
          name: 'students',
          params: { groupId: this.groupId },
        });
      } else {
        await this.studentStore.updateStudent(this.userId, {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        });
      }
    },
  },
};
</script>

<template>
  <div>
    <TopBar
      :title="$t('student.' + (action === 'create' ? 'new' : 'update'))"
      :isSubsection="true"
    ></TopBar>

    <div class="subsection">
      <form @submit.prevent="submit">
        <label for="email" class="input-label">{{
          $t('student.form.email')
        }}</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="text-input mb-4"
          :placeholder="$t('student.form.email')"
          required
        />

        <label for="firstName" class="input-label">{{
          $t('student.form.firstName')
        }}</label>
        <input
          type="text"
          id="firstName"
          v-model="firstName"
          class="text-input mb-4"
          :placeholder="$t('student.form.firstName')"
          required
        />

        <label for="lastName" class="input-label">{{
          $t('student.form.lastName')
        }}</label>
        <input
          type="text"
          id="lastName"
          v-model="lastName"
          class="text-input mb-4"
          :placeholder="$t('student.form.lastName')"
          required
        />

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
            {{
              action === 'create' ? $t('student.create') : $t('student.save')
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
