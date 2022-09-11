<template>
  <header v-if="isLoggedIn">
    <NavBar></NavBar>
  </header>

  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
import { RouterView } from 'vue-router';

import NavBar from './components/nav/NavBar.vue';
import { useUserStore } from './stores/user.js';

let userStore;

export default {
  components: {
    RouterView,
    NavBar,
  },
  computed: {
    isLoggedIn: () => userStore.isLoggedIn,
  },
  setup() {
    userStore = useUserStore();
  },
};
</script>

<style lang="scss">
/* TODO */
@import './assets/scss/index.scss';
</style>
