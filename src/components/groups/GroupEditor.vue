<template>
  <div>
    <form @submit.prevent="submit">
      <label for="name" class="input-label">{{ $t('group.form.name') }}</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="text-input"
        :placeholder="$t('group.form.name')"
        required
      />

      <template v-if="action === 'update'">
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
          <ButtonSpinner v-if="loading"></ButtonSpinner>
          {{ action === 'create' ? $t('group.create') : $t('group.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ButtonSpinner from '../buttons/ButtonSpinner.vue';

import { useGroupStore } from '../../stores/group.js';
import groupsService from '../../services/groups.service';

export default {
  name: 'GroupEditor',
  components: {
    ButtonSpinner,
  },
  props: {
    groupId: { type: String, required: true },
    action: { type: String, default: 'create' },
  },
  data() {
    return {
      loading: false,
      createdGroupId: null,
    };
  },
  setup() {
    const groupStore = useGroupStore();

    return { groupStore };
  },
  computed: {
    name: {
      get() {
        return this.groupStore.name;
      },
      set(value) {
        this.groupStore.group.name = value;
      },
    },
    teachers() {
      return this.groupStore.teachers;
    },
    students() {
      return this.groupStore.students;
    },
    submitDisabled() {
      return !this.name.length;
    },
  },
  methods: {
    async submit() {
      if (this.action === 'create') {
        this.loading = true;
        const group = await this.groupStore.createGroup({
          name: this.name,
          teachers: this.teachers,
          students: this.students,
        });

        this.createdGroupId = group._id;
        this.$router.push({ name: 'groups' });
      } else {
        this.loading = true;
        await groupsService.updateGroup(this.groupId, {
          name: this.name,
          teachers: this.teachers,
          students: this.students,
        });
        this.loading = false;
      }
    },
    addStudent(email) {
      this.studentStore.addStudent({
        index: this.students.length,
        email,
        role: 'student',
      });
    },
    deleteStudent(studentIndex) {
      this.studentStore.deleteStudent(studentIndex);
    },
  },
};
</script>