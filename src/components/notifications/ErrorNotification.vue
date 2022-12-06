<script>
import { InformationCircleIcon } from '@heroicons/vue/24/solid';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import { useNotificationsStore } from '../../stores/notifications.js';

let notificationsStore;

export default {
  name: 'ErrorNotification',
  components: {
    InformationCircleIcon,
    XMarkIcon,
  },
  setup() {
    notificationsStore = useNotificationsStore();
  },
  computed: {
    error() {
      return notificationsStore.lastError;
    },
  },
  methods: {
    close() {
      notificationsStore.popError();
    },
  },
};
</script>

<template>
  <div
    v-if="error"
    id="error-alert"
    class="flex p-4 mb-4 bg-red-100 rounded-lg"
    role="alert"
  >
    <InformationCircleIcon
      class="flex-shrink-0 w-5 h-5 text-red-700"
    ></InformationCircleIcon>
    <span class="sr-only">{{ $t('notifications.error') }}</span>
    <div class="ml-3 text-sm font-medium text-red-700">
      {{
        $te(`errors.${error.errorCode}`)
          ? $t(`errors.${errorCode}`)
          : `${error.errorCode}: ${error.message}`
      }}
    </div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
      data-dismiss-target="#error-alert"
      :aria-label="$t('notifications.close')"
    >
      <span class="sr-only">{{ $t('notifications.close') }}</span>
      <XMarkIcon @click="close" class="w-5 h-5"></XMarkIcon>
    </button>
  </div>
</template>
