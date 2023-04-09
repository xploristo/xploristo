<script>
import { ArrowSmallLeftIcon } from '@heroicons/vue/24/outline';

import { useAppStore } from '../../stores/app.js';

/* TODO Previous route when it's first page (and not home) */

export default {
  name: 'TopBar',
  components: {
    ArrowSmallLeftIcon,
  },
  props: {
    title: { type: String },
    backUrl: { type: String },
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
      class="icon-medium-blue stroke-3 cursor-pointer mr-2 hover:text-blue-600"
    ></ArrowSmallLeftIcon>

    <h1 v-if="title" class="text-xl">{{ title }}</h1>
  </div>
</template>
