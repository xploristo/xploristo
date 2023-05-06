<template>
  <button
    id="dropdownAvatarNameButton"
    data-dropdown-toggle="dropdownAvatarName"
    class="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
    type="button"
    @click="showDropdown = !showDropdown"
  >
    <span class="sr-only">Open user menu</span>
    <UserCircleIcon class="mr-1 w-8 h-8 rounded-full"></UserCircleIcon>
    {{ fullName }}
    <ChevronDownIcon
      v-if="!showDropdown"
      class="w-4 h-4 mx-1.5"
    ></ChevronDownIcon>
    <ChevronUpIcon v-else class="w-4 h-4 mx-1.5 font-medium"></ChevronUpIcon>
  </button>

  <!-- Dropdown menu -->
  <!-- TODO Make wider -->
  <!-- TODO Change language -->
  <div
    v-if="showDropdown"
    id="dropdownAvatarName"
    class="z-50 mt-8 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    style="
      position: absolute;
      inset: 0px auto auto 0px;
      transform: translate3d(0px, 10px, 0px);
    "
    data-popper-reference-hidden=""
    data-popper-escaped=""
    data-popper-placement="bottom"
  >
    <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
      <div class="font-medium">{{ $t('nav.account.role.' + role) }}</div>
      <div class="truncate">{{ email }}</div>
    </div>
    <!-- TODO Settings -->
    <!-- FIXME Credits -->
    <!--     <ul
      class="py-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
    >
      <li>
        <a
          href="#"
          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >Settings</a
        >
      </li>
      <li>
        <a
          href="#"
          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >About</a
        >
      </li>
    </ul> -->
    <div class="py-1">
      <a
        @click="logout"
        class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >{{ $t('nav.account.logout') }}</a
      >
    </div>
  </div>
</template>

<script>
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

import { useUserStore } from '../../stores/user.js';

export default {
  name: 'AccountMenu',
  components: {
    UserCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
  computed: {
    fullName() {
      return this.userStore.fullName;
    },
    email() {
      return this.userStore.email;
    },
    role() {
      return this.userStore.role;
    },
  },
  methods: {
    async logout() {
      await this.userStore.logout();
    },
  },
};
</script>
