<template>
  <header v-if="isLoggedIn">
    <NavBar></NavBar>
  </header>

  <main class="main">
    <ErrorNotification></ErrorNotification>
    <RouterView></RouterView>
  </main>
</template>

<script>
import { RouterView } from 'vue-router';

import NavBar from './components/nav/NavBar.vue';
import ErrorNotification from './components/notifications/ErrorNotification.vue';
import { useUserStore } from './stores/user.js';

let userStore;

export default {
  components: {
    RouterView,
    NavBar,
    ErrorNotification,
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
