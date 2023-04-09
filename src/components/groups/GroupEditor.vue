<script>
import SpinnerIcon from '../icons/SpinnerIcon.vue';

import { useGroupStore } from '../../stores/group.js';
import groupsService from '../../services/groups.service';

export default {
  name: 'GroupEditor',
  components: {
    SpinnerIcon,
  },
  props: {
    groupId: { type: String },
    action: { type: String, required: true },
  },
  data() {
    return {
      loading: false,
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
        });

        this.$router.push({ name: 'group', params: { groupId: group._id } });
      } else {
        this.loading = true;
        await groupsService.updateGroup(this.groupId, {
          name: this.name,
        });
        this.loading = false;
      }
    },
  },
};
</script>

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
          {{ action === 'create' ? $t('group.create') : $t('group.save') }}
        </button>
      </div>
    </form>
  </div>
</template>
