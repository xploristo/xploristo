<script>
import { RouterLink } from 'vue-router';

import AccountMenu from './AccountMenu.vue';

export default {
  name: 'NavBar',
  components: {
    RouterLink,
    AccountMenu,
  },
  computed: {
    activeSection() {
      return this.$route.meta.sectionName;
    },
  },
};
</script>

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
          <li v-if="$hasPermissionTo('teachers.list')">
            <RouterLink
              to="/teachers"
              :class="
                activeSection === 'teachers'
                  ? 'nav-section-active'
                  : 'nav-section-inactive'
              "
              aria-current="page"
              >{{ $t('nav.teachers') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/tests"
              :class="
                activeSection === 'tests'
                  ? 'nav-section-active'
                  : 'nav-section-inactive'
              "
              aria-current="page"
              >{{ $t('nav.tests') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/groups"
              :class="
                activeSection === 'groups'
                  ? 'nav-section-active'
                  : 'nav-section-inactive'
              "
              aria-current="page"
              >{{ $t('nav.groups') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
