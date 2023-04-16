<script>
import { ArrowSmallLeftIcon } from '@heroicons/vue/24/outline';

import { useAppStore } from '../../stores/app.js';

// TODO Previous route when first page is not home (reloads, etc.)

export default {
  name: 'TopBar',
  components: {
    ArrowSmallLeftIcon,
  },
  props: {
    title: { type: String },
    backUrl: { type: String },
    isSubsection: { type: Boolean, default: false },
  },
  setup() {
    const appStore = useAppStore();

    return { appStore };
  },
  computed: {
    backTo() {
      return this.backUrl || this.appStore.previousRoute.path;
    },
  },
  methods: {
    goBack() {
      this.$router.replace(this.backTo);
    },
  },
};
</script>

<template>
  <div class="flex items-center mb-4">
    <ArrowSmallLeftIcon
      v-if="backTo"
      @click="goBack()"
      :class="isSubsection ? 'back-icon-small' : 'back-icon'"
    ></ArrowSmallLeftIcon>

    <template v-if="title">
      <h1 v-if="!isSubsection" class="text-xl">{{ title }}</h1>
      <h2 v-else class="text-lg">{{ title }}</h2>
    </template>
  </div>
</template>
