<script>
import SpinnerIcon from '../icons/SpinnerIcon.vue';

import { useTeacherStore } from '../../stores/teacher.js';
import teachersService from '../../services/teachers.service';

export default {
  name: 'TeacherEditor',
  components: {
    SpinnerIcon,
  },
  props: {
    teacherId: { type: String },
    action: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
      createdTeacherId: null,
    };
  },
  setup() {
    const teacherStore = useTeacherStore();

    return { teacherStore };
  },
  async created() {
    if (this.teacherId) {
      await this.teacherStore.getTeacher(this.teacherId);
    }
  },
  computed: {
    email: {
      get() {
        return this.teacherStore.email;
      },
      set(value) {
        this.teacherStore.teacher.email = value;
      },
    },
    firstName: {
      get() {
        return this.teacherStore.firstName;
      },
      set(value) {
        this.teacherStore.teacher.firstName = value;
      },
    },
    lastName: {
      get() {
        return this.teacherStore.lastName;
      },
      set(value) {
        this.teacherStore.teacher.lastName = value;
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
        const teacher = await this.teacherStore.createTeacher({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
        });

        this.createdTeacherId = teacher._id;
        // TODO Teachers view but adding teacher to the table
        this.$router.push({ name: 'teachers' });
      } else {
        await teachersService.updateTeacher(this.teacherId, {
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
    <form @submit.prevent="submit">
      <label for="email" class="input-label">{{
        $t('teacher.form.email')
      }}</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="text-input mb-4"
        :placeholder="$t('teacher.form.email')"
        required
      />

      <label for="firstName" class="input-label">{{
        $t('teacher.form.firstName')
      }}</label>
      <input
        type="text"
        id="email"
        v-model="firstName"
        class="text-input mb-4"
        :placeholder="$t('teacher.form.firstName')"
        required
      />

      <label for="lastName" class="input-label">{{
        $t('teacher.form.lastName')
      }}</label>
      <input
        type="text"
        id="lastName"
        v-model="lastName"
        class="text-input mb-4"
        :placeholder="$t('teacher.form.lastName')"
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
          {{ action === 'create' ? $t('teacher.create') : $t('teacher.save') }}
        </button>
      </div>
    </form>
  </div>
</template>
