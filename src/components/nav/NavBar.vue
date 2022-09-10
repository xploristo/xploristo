<template>
  <nav>
    <div class="nav-menu">
      <div class="nav-menu__item">
        <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
      </div>
      <div class="nav-menu__item">
        <RouterLink to="/about">a</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'NavBar',
  components: {
    RouterLink,
  },
};
</script>

<style lang="scss">
:root {
  --shadow-bottom: 0 6px 6px -1px rgba(10, 22, 70, 0.1),
    0 0 1px 0 rgba(10, 22, 70, 0.06);
}

nav {
  display: flex;
  align-items: center;

  height: 60px;
  box-shadow: var(--shadow-bottom);
}

.nav-menu {
  display: flex;

  &__item {
    display: flex;
    margin-left: 30px;
  }
}
</style>
