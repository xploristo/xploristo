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
    questionIndex: { type: Number, required: true },
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
      const selection = document.getSelection();
      selection.removeAllRanges();
      await this.sleep(2000);
      selection.addRange(deserializedRange);
    }, */
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<template>
  <!-- TODO  center -->
  <div
    id="extralarge-modal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="document-modal">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between p-5 rounded-t border-b dark:border-gray-600"
        >
          <div>
            <TestQuestion
              :questionIndex="questionIndex"
              @selectionSaved="
                () => {
                  $emit('close');
                }
              "
            ></TestQuestion>
          </div>

          <button
            type="button"
            class="text-gray-400 hover:text-gray-900 text-sm p-1.5 ml-auto inline-flex rounded-lg"
            data-modal-toggle="extralarge-modal"
            @click="$emit('close')"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 bg-transparent hover:bg-gray-200"
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
            <span class="sr-only">{{ $t('document.modal.srClose') }}</span>
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
