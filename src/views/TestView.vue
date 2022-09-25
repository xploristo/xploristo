<template>
  <!-- TODO Test for ultra wide screens (max width?) -->
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

    <!-- TODO: -->
    <!-- https://github.com/FranckFreiburger/vue-pdf/issues/15 -->
    <!-- https://stackoverflow.com/questions/55848544/zoom-part-of-webpage-independently-from-the-rest-of-the-page -->
    <!-- https://stackoverflow.com/questions/17782465/zoom-specific-element-on-webcontent-html-css-javascript -->
    <!-- Maybe add zoom in? Remove margins and paddings, etc. -->
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
      test: null,
      pdfUrl: null,
      questions: [],
      documentContainerTop: 60,
    };
  },
  async mounted() {
    const testStore = useTestStore();
    this.test = await testStore.getTest(this.testId);
    this.questions = testStore.questions; // TODO
    this.pdfUrl = testStore.documentDownloadUrl;

    // TODO Send home if test not found
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
