<template>
  <!-- TODO  center -->
  <div
    id="extralarge-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-7xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600"
        >
          <div>
            <TestQuestion
              :question="questionToSelect"
              :hideControls="true"
              @selectionSaved="
                (selection, range) => {
                  $emit('answerSelected', selection, range);
                  $emit('close');
                }
              "
            ></TestQuestion>
          </div>

          <!-- TODO Move up -->
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="extralarge-modal"
            @click="$emit('close')"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal body -->
        <!-- TODO Scroll not working -->
        <div class="document-modal-container">
          <PdfViewer :pdfUrl="pdfUrl"></PdfViewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import rangySerializer from 'rangy/lib/rangy-serializer'; */

import TestQuestion from './questions/TestQuestion.vue';
import PdfViewer from '../viewer/PdfViewer.vue';

export default {
  name: 'DocumentModal',
  components: {
    TestQuestion,
    PdfViewer,
  },
  props: {
    pdfUrl: { type: String, required: true },
    questionToSelect: { required: true },
  },
  mounted() {
    /* const answer = this.questionToSelect.answers[0].answer;
    if (answer) {
      this.applySelection(answer.serializedRange);
    } */
  },
  methods: {
    /* async applySelection(serializedRange) {
      // TODO This works with page content but not for PDF
      const deserializedRange =
        rangySerializer.deserializeRange(serializedRange).nativeRange;
      console.log('🔴 range 3', deserializedRange);
      const selection = document.getSelection();
      selection.removeAllRanges();
      await this.sleep(2000);
      console.log('applying selection');
      selection.addRange(deserializedRange);
    }, */
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>
