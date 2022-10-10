<script>
import { InformationCircleIcon } from '@heroicons/vue/24/outline';
import rangySerializer from 'rangy/lib/rangy-serializer';

import { useTestStore } from '../../../stores/test';

export default {
  name: 'TestQuestion',
  components: {
    InformationCircleIcon,
  },
  props: {
    question: {
      required: true,
    },
    questionIndex: {
      type: Number,
    },
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
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
  },
  methods: {
    saveSelection() {
      const selection = document.getSelection();
      const range = selection.getRangeAt(0);
      const serializedRange = rangySerializer.serializeRange(range, true);

      const answer = {
        selection,
        textSelection: selection.toString(),
        serializedRange,
      };
      this.questions[this.questionIndex].answers[0].answer = answer;
      this.$emit('selectionSaved');
    },
    onSingleChoiceAnswerChange(event) {
      const answerIndex = +event.target.value;
      const answers = this.questions[this.questionIndex].answers;
      answers.forEach((answer) => {
        answer.correct = answer.index === answerIndex;
      });
      this.testStore.saveAnswers(this.questionIndex, answers);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="questions[questionIndex].type === 'selection'" class="flex mb-2">
      <InformationCircleIcon
        class="icon-small-gray icon-inline"
      ></InformationCircleIcon>
      <span class="text-gray">{{
        $t('test.question.instructions.selection')
      }}</span>
    </div>

    <div class="mb-3">{{ questions[questionIndex].question }}</div>

    <!-- Answers -->
    <div class="flex-auto">
      <!-- Selection answer -->
      <div v-if="questions[questionIndex].type === 'selection'">
        <div
          v-if="questions[questionIndex].answers[0].answer?.textSelection"
          class="mb-4 p-2 pl-4 pr-4 w-full bg-gray-50 rounded-lg border border-gray-300"
        >
          {{ questions[questionIndex].answers[0].answer?.textSelection }}
        </div>
        <button type="button" class="button-blue" @click="saveSelection()">
          {{ $t('test.saveSelection') }}
        </button>
      </div>

      <!-- Text answer -->
      <div v-if="questions[questionIndex].type === 'text'">
        <textarea
          v-model="questions[questionIndex].answers[0].answer"
          :id="`question${question.index}-answer1`"
          :placeholder="$t('questions.answers.label')"
          class="text-input"
        >
        </textarea>
      </div>

      <!-- Single and multi-choice answer -->
      <template
        v-if="
          ['singleChoice', 'multiChoice'].includes(
            questions[questionIndex].type
          )
        "
      >
        <div
          v-for="answer in questions[questionIndex].answers"
          v-bind:key="answer.index"
          class="flex flex-row"
        >
          <div class="mr-3">
            <input
              v-if="questions[questionIndex].type === 'singleChoice'"
              type="radio"
              :name="questions[questionIndex].index"
              :value="answer.index"
              :checked="answer.correct"
              @change="onSingleChoiceAnswerChange"
            />
            <input
              v-else
              type="checkbox"
              :id="`check${questionIndex}-${answer.index}`"
              :value="true"
              v-model="answer.correct"
            />
          </div>
          <div class="basis-full">
            {{ answer.answer }}
          </div>

          <!-- TODO Add trash button, move up, move down -->
        </div>
      </template>
    </div>
  </div>
</template>
