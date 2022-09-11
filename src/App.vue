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

export default {
  components: {
    RouterView,
    NavBar,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  async mounted() {
    const userStore = useUserStore();
    this.isLoggedIn = userStore.isLoggedIn;
  },
};
</script>

<style lang="scss">
/* TODO */
@import './assets/scss/index.scss';
</style>
