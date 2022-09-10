<template>
  <main>
    <div>Test</div>
    <div>{{ testId }}</div>

    <!-- <question-carousel></question-carousel> -->
    <div v-for="question in questions" :key="question.index">
      <test-question :question="question"></test-question>
    </div>

    <div v-if="pdfUrl">
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
    /* QuestionCarousel, */
  },
  props: {
    testId: String,
  },
  data() {
    return {
      pdfUrl: null,
      questions: [],
    };
  },
  async mounted() {
    console.log(process.env.NODE_ENV);
    const testStore = useTestStore();
    this.pdfUrl = await testStore.getDocumentUrl();
    this.questions = testStore.questions;
  },
};
</script>
