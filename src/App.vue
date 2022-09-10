<template>
  <header>
    <NavBar></NavBar>
  </header>

  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
import { RouterView } from 'vue-router';

import NavBar from './components/nav/NavBar.vue';

export default {
  components: {
    RouterView,
    NavBar,
  },
};
</script>

<style lang="scss">
@import './assets/scss/index.scss';
</style>
