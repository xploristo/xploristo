<template>
  <div>
    <div v-if="question.type === 'selection'">
      <div class="flex mb-2">
        <InformationCircleIcon
          class="icon-small-gray icon-inline"
        ></InformationCircleIcon>
        <span class="text-gray">{{
          $t('test.question.instructions.selection')
        }}</span>
      </div>

      <div class="mb-3">{{ question.question }}</div>

      <div class="flex items-center place-content-between">
        <button type="button" class="button-blue" @click="saveSelection">
          {{ $t('test.saveSelection') }}
        </button>

        <div class="flex">
          <ChevronLeftIcon class="icon-small-blue ml-2"></ChevronLeftIcon>
          <div class="hidden md:block">
            <!-- TODO Actual data -->
            <div
              v-for="i in questionCount"
              :key="i"
              class="ml-2"
              :class="{
                'circle-number-outline-blue': [
                  1, 2, 3, 5, 6, 8, 9, 10,
                ].includes(i),
                'circle-number-filled-blue': [4, 7].includes(i),
              }"
            >
              {{ i }}
            </div>
          </div>

          <ChevronRightIcon class="icon-small-blue ml-2"></ChevronRightIcon>
          <CheckIcon class="icon-small-blue ml-2 stroke-4"></CheckIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'TestQuestion',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckIcon,
    InformationCircleIcon,
  },
  props: {
    question: {
      required: true,
    },
  },
  data() {
    return {
      questionCount: 10, // TODO
    };
  },
  methods: {
    saveSelection() {
      const selection = document.getSelection();
      console.log('selection', selection.toString());
      console.log(selection);
    },
  },
};
</script>
