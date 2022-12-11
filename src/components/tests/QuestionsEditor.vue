<template>
  <div>
    <div
      v-for="question in questions"
      v-bind:key="question.index"
      class="flex mt-4 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8"
    >
      <div class="flex-auto">
        <div>
          {{ $t('questions.question.title', { index: question.index + 1 }) }}
        </div>

        <!-- Question text -->
        <div class="mt-2">
          <textarea
            v-model="question.question"
            :id="`question+${question.index}`"
            :placeholder="$t('questions.question.placeholder')"
            class="text-input"
          >
          </textarea>
        </div>

        <!-- Answer -->
        <!-- TODO Allow reordering answers -->
        <div class="mt-2">
          <!-- Selection answer -->
          <template v-if="question.type === 'selection'">
            <template v-if="question.answers[0].answer">
              <p>{{ $t('questions.answers.selectLabel') }}</p>
              <div
                class="mt-2 mb-2 p-2 w-full bg-gray-50 rounded-lg border border-gray-300"
              >
                {{ question.answers[0].answer?.textSelection }}
              </div>
            </template>

            <button
              type="button"
              class="button-blue mt-2"
              @click="() => (questionToSelectIndex = question.index)"
            >
              {{ $t('questions.answers.select') }}
            </button>

            <DocumentModal
              v-if="questionToSelectIndex != null"
              :pdfUrl="pdfUrl"
              :questionIndex="questionToSelectIndex"
              @answerSelected="onAnswerSelected"
              @close="questionToSelectIndex = null"
            ></DocumentModal>
          </template>

          <!-- Text answer -->
          <template v-else-if="question.type === 'text'">
            <!-- TODO Additional valid answers? Option for auto-correct or not -->
            <label :for="`question${question.index}-answer1`">{{
              $t('questions.answers.label')
            }}</label>

            <textarea
              v-model="question.answers[0].answer"
              :id="`question${question.index}-answer1`"
              :placeholder="$t('questions.answers.label')"
              class="text-input"
            >
            </textarea>
          </template>

          <!-- Single and multi-choice answer -->
          <template v-else>
            <p>{{ $t('questions.answers.title') }}</p>

            <div
              v-for="answer in question.answers"
              v-bind:key="answer.index"
              class="flex flex-row mt-2"
            >
              <div class="mr-3 py-2">
                <input
                  v-if="question.type === 'singleChoice'"
                  type="radio"
                  :name="question.index"
                  :value="answer.index"
                  :checked="answer.correct"
                  @change="onSingleChoiceAnswerChange($event, question.index)"
                />
                <input
                  v-else
                  type="checkbox"
                  :id="`check${question.index}-${answer.index}`"
                  :value="true"
                  v-model="answer.correct"
                />
              </div>
              <div class="basis-full">
                <textarea
                  v-model="answer.answer"
                  :id="`question${question.index}-answer${answer.index}`"
                  :placeholder="
                    $t('questions.answers.multiLabel', {
                      index: answer.index + 1,
                    })
                  "
                  class="text-input"
                >
                </textarea>
              </div>

              <!-- TODO Add buttons: move up, move down -->
            </div>

            <!-- TODO Add plus button on the right of last answer? -->
            <button
              type="button"
              class="button-blue mt-2"
              @click="addChoiceAnswer(question.index)"
            >
              {{ $t('questions.answers.add') }}
            </button>
          </template>
        </div>
      </div>
      <div class="flex-none">
        <TrashIcon
          aria-hidden="true"
          class="ml-2 w-5 h-5 cursor-pointer"
          @click="deleteQuestion(question.index)"
        ></TrashIcon>
      </div>
    </div>

    <!-- Dropdown button -->
    <button
      data-dropdown-toggle="addQuestionDropdown"
      id="addQuestionDropdownButton"
      type="button"
      class="button-blue mt-4"
      @click="shouldShowAddQuestionDropdown = !shouldShowAddQuestionDropdown"
    >
      {{ $t('questions.add') }}
      <ChevronDownIcon
        v-if="!shouldShowAddQuestionDropdown"
        aria-hidden="true"
        class="ml-2 w-5 h-5"
      ></ChevronDownIcon>
      <ChevronUpIcon
        v-if="shouldShowAddQuestionDropdown"
        aria-hidden="true"
        class="ml-2 w-5 h-5"
      ></ChevronUpIcon>
    </button>
    <!-- Dropdown menu -->
    <div
      id="addQuestionDropdown"
      class="z-10 w-44 mt-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
      :class="{ hidden: !shouldShowAddQuestionDropdown }"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        <li>
          <a
            @click="addQuestion('selection')"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t('questions.types.selection') }}</a
          >
        </li>
        <li>
          <a
            @click="addQuestion('text')"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t('questions.types.text') }}</a
          >
        </li>
        <li>
          <a
            @click="addQuestion('singleChoice')"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t('questions.types.singleChoice') }}</a
          >
        </li>
        <li>
          <a
            @click="addQuestion('multiChoice')"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ $t('questions.types.multiChoice') }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

import { useTestStore } from '../../stores/test.js';
import DocumentModal from './DocumentModal.vue';

export default {
  name: 'QuestionsEditor',
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
    TrashIcon,
    DocumentModal,
  },
  props: {
    testId: String,
  },
  data() {
    return {
      pdfUrl: null,
      shouldShowAddQuestionDropdown: false,
      questionToSelectIndex: null,
    };
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  computed: {
    questions() {
      return this.testStore.questions;
    },
  },
  async mounted() {
    await this.testStore.getTest(this.testId);
    this.pdfUrl = this.testStore.documentDownloadUrl;
  },
  methods: {
    addQuestion(type) {
      const answers = [
        {
          index: 0,
          answer: null,
          correct: ['selection', 'text'].includes(type),
        },
      ];

      if (['singleChoice', 'multiChoice'].includes(type)) {
        answers.push({ index: 1, answer: null, correct: false });
        answers.push({ index: 2, answer: null, correct: false });
      }

      this.testStore.addQuestion({
        index: this.questions.length,
        question: '',
        type,
        answers,
      });
      this.shouldShowAddQuestionDropdown = false;
    },
    onAnswerSelected(selection, serializedRange) {
      const questionIndex = this.questions.findIndex(
        (question) => question.index === this.questionToSelectIndex
      );
      this.testStore.saveAnswer(questionIndex, {
        index: 0,
        answer: {
          selection,
          textSelection: selection.toString(),
          serializedRange,
        },
        correct: true,
      });
    },
    addChoiceAnswer(questionIndex) {
      this.testStore.addAnswer(questionIndex, {
        index: this.questions[questionIndex].answers.length,
        answer: '',
        correct: false,
      });
    },
    onSingleChoiceAnswerChange(event, questionIndex) {
      const answerIndex = +event.target.value;
      const answers = this.questions[questionIndex].answers;
      answers.forEach((answer) => {
        answer.correct = answer.index === answerIndex;
      });
      this.testStore.saveAnswers(questionIndex, answers);
    },
    deleteQuestion(questionIndex) {
      this.testStore.deleteQuestion(questionIndex);
    },
  },
};
</script>
