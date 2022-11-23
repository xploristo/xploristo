<template>
  <div>
    <form @submit.prevent="submit">
      <label for="email" class="input-label">{{
        $t('student.form.email')
      }}</label>
      <input
        type="text"
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
        id="email"
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
          <ButtonSpinner v-if="loading"></ButtonSpinner>
          {{ action === 'create' ? $t('student.create') : $t('student.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ButtonSpinner from '../../buttons/ButtonSpinner.vue';

import { useStudentStore } from '../../../stores/student.js';
import usersService from '../../../services/users.service';

export default {
  name: 'StudentEditor',
  components: {
    ButtonSpinner,
  },
  props: {
    userId: { type: String },
    groupId: { type: String, required: true },
    action: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      createdStudentId: null,
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
        const student = await this.studentStore.createStudent(this.groupId, {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        });

        this.createdStudentId = student._id;
        // TODO Students view but adding student to the table
        this.$router.push({
          name: 'group',
          params: { groupId: this.groupId },
        });
      } else {
        await usersService.updateUser(this.userId, {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        });
      }
    },
  },
};
</script>
