<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
    aria-hidden="true"
  >
    <div class="modal-center">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-6 text-center">
          <ExclamationTriangleIcon
            aria-hidden="true"
            class="mx-auto mb-4 w-14 h-14 text-gray-900 stroke-1"
          >
          </ExclamationTriangleIcon>
          <p
            class="mb-5 text-base text-gray-900"
            :innerHTML="$t(title, titleData)"
          ></p>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            @click="$emit('confirm')"
          >
            {{ $t(confirm) }}
          </button>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            class="bg-white text-gray-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 focus:z-10"
            @click="$emit('close')"
          >
            {{ $t(cancel) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'ConfirmModal',
  components: {
    ExclamationTriangleIcon,
  },
  props: {
    title: { type: String, required: true },
    titleData: { type: Object },
    confirm: { type: String, required: true },
    cancel: { type: String, required: true },
  },
};
</script>
