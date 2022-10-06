<template>
  <!-- TODO Nav margins -->
  <nav
    class="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-b border-gray-200"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <RouterLink to="/" class="flex items-center">
        <img
          src="/images/vision-blue.png"
          class="mr-3 h-6 sm:h-9"
          alt="xploristo Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >xploristo</span
        >
      </RouterLink>

      <div class="flex md:order-2">
        <AccountMenu></AccountMenu>
      </div>

      <div
        v-if="$hasPermissionTo('nav.menu.show')"
        class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
              >{{ $t('nav.tests') }}</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >{{ $t('nav.groups') }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <nav class="">
    <div class="nav-menu">
      <div class="nav-menu__item">
        <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
      </div>
    </div>
  </nav> -->
</template>

<script>
import { RouterLink } from 'vue-router';

import AccountMenu from './AccountMenu.vue';

export default {
  name: 'NavBar',
  components: {
    RouterLink,
    AccountMenu,
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
