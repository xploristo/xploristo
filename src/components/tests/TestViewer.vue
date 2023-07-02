<script>
import {
  PencilSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline';

import TopBar from '../nav/TopBar.vue';
import TestQuestion from './questions/TestQuestion.vue';
import PdfViewer from '../viewer/PdfViewer.vue';
import { useTestStore } from '../../stores/test.js';
import { useGroupStore } from '../../stores/group.js';

export default {
  name: 'TestView',
  components: {
    PencilSquareIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    TopBar,
    PdfViewer,
    TestQuestion,
  },
  props: {
    isPreview: { type: Boolean, default: false },
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
    const groupStore = useGroupStore();

    return { testStore, groupStore };
  },
  async created() {
    await this.testStore.getTest(this.testId, this.assignmentId, this.groupId);
    await this.testStore.getDocumentDownloadUrl(
      this.testId,
      this.assignmentId,
      this.groupId
    );

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
            if (
              question.answers?.length &&
              question.answers[0].answer?.textSelection?.length
            ) {
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
    backRoute() {
      if (this.assignmentId) {
        return { name: 'assignment' };
      } else if (this.isPreview) {
        return '/tests';
      }
      return null;
    },
    editRoute() {
      if (this.assignmentId) {
        return { name: 'assignmentTestEdit' };
      }
      return '/tests/' + this.testId;
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
      await this.groupStore.createAssignmentResult(
        this.assignmentId,
        this.questions
      );

      this.$router.replace({
        name: 'group',
        params: { groupId: this.groupId },
      });
    },
  },
};
</script>

<template>
  <!-- TODO Test for ultra wide screens (max width?) -->
  <div v-if="questions.length" id="test-container" class="test-container">
    <TopBar :title="$t('test.title')" :backRoute="backRoute"></TopBar>

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
        <!-- Question navigation -->
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
              'circle-number-selected': selectedQuestionIndex === i - 1,
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

        <RouterLink v-if="isPreview" :to="editRoute" replace>
          <PencilSquareIcon
            class="ml-2 icon-small-blue cursor-pointer"
          ></PencilSquareIcon>
        </RouterLink>
        <!-- TODO Confirm modal -->
        <button
          v-else-if="assignmentId"
          @click="!isPreview && sendResult()"
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
      :isPreview="isPreview"
    ></TestQuestion>
  </div>

  <!-- TODO (pdf viewer improvements): -->
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
