<template>
  <main class="">
    <div id="test-container" class="test-container">
      <div class="test-title">Test</div>
      <div v-for="(question, index) in questions" :key="question.index">
        <div class="text-bold mb-1">
          {{
            $t('test.question.title', {
              index: index + 1,
              total: 10 /* TODO */,
            })
          }}
        </div>

        <test-question :question="question"></test-question>
      </div>
    </div>

    <div
      v-if="pdfUrl"
      id="document-container"
      class="document-container"
      :style="{ top: `${documentContainerTop}px` }"
    >
      <pdf-viewer :pdf-url="pdfUrl"></pdf-viewer>
    </div>
  </main>
</template>

<script>
import TestQuestion from '../components/tests/questions/TestQuestion.vue';
import PdfViewer from '../components/viewer/PdfViewer.vue';
/* import QuestionCarousel from '../components/tests/QuestionCarousel.vue'; */
import { useTestStore } from '../stores/test.js';

export default {
  name: 'TestView',
  components: {
    PdfViewer,
    TestQuestion,
  },
  props: {
    testId: String,
  },
  data() {
    return {
      pdfUrl: null,
      questions: [],
      documentContainerTop: 60,
    };
  },
  async mounted() {
    const testStore = useTestStore();
    this.pdfUrl = await testStore.getDocumentUrl();
    this.questions = testStore.questions;
  },
  updated() {
    this.setDocumentContainerTop();
  },
  methods: {
    setDocumentContainerTop() {
      const questionCard = document.getElementById('test-container');
      const questionCardHeight = questionCard.offsetHeight;
      const questionCardTop = questionCard.offsetTop;

      console.log('questionCardHeight', questionCardHeight);

      this.documentContainerTop = questionCardHeight + questionCardTop;
    },
  },
};
</script>
