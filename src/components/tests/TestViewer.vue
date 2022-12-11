<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

import TestQuestion from './questions/TestQuestion.vue';
import PdfViewer from '../viewer/PdfViewer.vue';
import resultsService from '../../services/results.service.js';
import { useTestStore } from '../../stores/test.js';

export default {
  name: 'TestView',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    PdfViewer,
    TestQuestion,
  },
  props: {
    testId: { type: String, required: true },
    assignmentId: { type: String },
    groupId: { type: String },
  },
  data() {
    return {
      selectedQuestionIndex: 0,
      documentContainerTop: 60,
    };
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  async created() {
    await this.testStore.getTest(this.testId);
  },
  updated() {
    this.setDocumentContainerTop();
  },
  computed: {
    questions() {
      return this.testStore.questions;
    },
    completedQuestions() {
      return this.questions.reduce((acc, question, index) => {
        switch (question.type) {
          case 'text':
            if (question.answers[0].answer?.length) {
              acc.push(index);
            }
            break;
          case 'selection':
            if (question.answers[0].answer?.textSelection?.length) {
              acc.push(index);
            }
            break;
          case 'singleChoice':
          case 'multiChoice':
            if (question.answers.find((answer) => answer.correct)) {
              acc.push(index);
            }
            break;
        }

        return acc;
      }, []);
    },
    pdfUrl() {
      return this.testStore.documentDownloadUrl;
    },
  },
  methods: {
    setDocumentContainerTop() {
      const questionCard = document.getElementById('test-container');
      const questionCardHeight = questionCard.offsetHeight;
      const questionCardTop = questionCard.offsetTop;

      this.documentContainerTop = questionCardHeight + questionCardTop;
    },
    async sendResult() {
      await resultsService.createResult({
        assignmentId: this.assignmentId,
        questions: this.questions,
      });
      // TODO Do not let users come back here via browser history?
      this.$router.push({ name: 'group', params: { groupId: this.groupId } });
    },
  },
};
</script>

<template>
  <!-- TODO Test for ultra wide screens (max width?) -->
  <div v-if="questions.length" id="test-container" class="test-container">
    <div class="section-title">Test</div>

    <div class="flex items-center place-content-between">
      <div class="text-bold mb-1">
        {{
          $t('test.question.title', {
            index: selectedQuestionIndex + 1,
            total: questions.length,
          })
        }}
      </div>

      <div class="flex">
        <ChevronLeftIcon
          @click="selectedQuestionIndex > 0 && selectedQuestionIndex--"
          class="ml-2"
          :class="
            selectedQuestionIndex > 0
              ? 'icon-small-blue cursor-pointer'
              : 'icon-small-disabled'
          "
        ></ChevronLeftIcon>
        <div class="hidden md:block">
          <div
            v-for="i in questions.length"
            :key="i"
            class="ml-2 cursor-pointer"
            :class="{
              'circle-number-outline-blue': !completedQuestions.includes(i - 1),
              'circle-number-filled-blue': completedQuestions.includes(i - 1),
            }"
            @click="selectedQuestionIndex = i - 1"
          >
            {{ i }}
          </div>
        </div>
        <ChevronRightIcon
          @click="
            selectedQuestionIndex < questions.length - 1 &&
              selectedQuestionIndex++
          "
          class="ml-2"
          :class="
            selectedQuestionIndex < questions.length - 1
              ? 'icon-small-blue cursor-pointer'
              : 'icon-small-disabled'
          "
        ></ChevronRightIcon>
        <!-- TODO Confirm modal -->
        <button
          v-if="assignmentId"
          @click="sendResult"
          class="button-small button-blue ml-2"
        >
          {{ $t('test.sendResult') }}
        </button>
      </div>
    </div>

    <TestQuestion
      :question="questions[selectedQuestionIndex]"
      :questionIndex="selectedQuestionIndex"
      :questionCount="questions.length"
      :completedQuestions="completedQuestions"
    ></TestQuestion>
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
    <PdfViewer :pdf-url="pdfUrl"></PdfViewer>
  </div>
</template>
