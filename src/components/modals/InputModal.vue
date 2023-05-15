<script>
import { XMarkIcon } from '@heroicons/vue/24/outline';

import SpinnerIcon from '../icons/SpinnerIcon.vue';

export default {
  name: 'InputModal',
  components: {
    SpinnerIcon,
    XMarkIcon,
  },
  props: {
    inputType: { type: String, default: 'text' },
    inputLabel: { type: String, required: true },
    submitLabel: { type: String, required: true },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    submit() {
      this.$emit('submitted', this.inputValue);
    },
  },
};
</script>

<template>
  <div
    id="popup-input-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
    aria-hidden="true"
  >
    <div class="modal-center">
      <div class="relative bg-white rounded-lg shadow">
        <div class="flex items-start justify-between px-4 pt-4 rounded-t">
          <button
            type="button"
            class="text-gray-400 hover:text-gray-500 text-sm p-1.5 ml-auto inline-flex items-center"
            @click="$emit('close')"
          >
            <XMarkIcon class="w-5 h-5"></XMarkIcon>
          </button>
        </div>
        <div class="px-6 pb-5">
          <form @submit.prevent="submit">
            <label for="name" class="input-label">{{ $t(inputLabel) }}</label>
            <input
              :type="inputType"
              id="name"
              v-model="inputValue"
              class="text-input"
              :placeholder="$t(inputLabel)"
              required
            />

            <div class="mt-5 text-right">
              <button
                type="submit"
                class="button-blue"
                :class="{
                  'button-disabled': !inputValue,
                }"
              >
                <SpinnerIcon v-if="loading"></SpinnerIcon>
                {{ $t(submitLabel) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
