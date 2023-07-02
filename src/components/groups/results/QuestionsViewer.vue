<script>
import { XMarkIcon, CheckIcon, PlusIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'QuestionsViewer',
  components: {
    XMarkIcon,
    CheckIcon,
    PlusIcon,
  },
  props: {
    result: Object,
  },
  methods: {
    isAnswerCorrect(answer, type) {
      if (['singleChoice', 'multiChoice'].includes(type)) {
        return answer.correctAnswer?.correct;
      } else if (type === 'text') {
        return answer.correctAnswer?.correct;
      }
    },
    getCorrectAnswer(answer) {
      return answer.correctAnswer?.value;
    },
  },
};
</script>

<template>
  <div>
    <div
      v-for="question in result.questions"
      v-bind:key="question.index"
      class="flex mt-4 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8"
    >
      <div class="flex-auto">
        <div>
          {{ question.question }}
        </div>

        <!-- Answer -->
        <div class="mt-2">
          <!-- Selection answer -->
          <template v-if="question.type === 'selection'">
            <div
              v-for="answer in question.answers"
              v-bind:key="answer.index"
              class="flex flex-row mt-4"
            >
              <div class="mr-3 pt-2.5">
                <CheckIcon
                  v-if="answer.isAnswerCorrect"
                  aria-hidden="true"
                  class="icon-small stroke-2 text-green-500"
                ></CheckIcon>
                <XMarkIcon
                  v-else
                  aria-hidden="true"
                  class="icon-small stroke-2 text-red-500"
                ></XMarkIcon>
              </div>
              <div
                class="p-2 w-full bg-gray-50 rounded-lg border border-gray-300"
                :class="{
                  'correct-input': answer.isAnswerCorrect,
                  'incorrect-input': !answer.isAnswerCorrect,
                }"
              >
                {{ answer.answer?.textSelection }}
              </div>
            </div>
            <div
              v-for="missingAnswer in question.missingAnswers"
              v-bind:key="'m' + missingAnswer.index"
              class="flex flex-row mt-4"
            >
              <div class="mr-3 pt-2.5">
                <PlusIcon
                  aria-hidden="true"
                  class="icon-small stroke-2 text-gray-500"
                ></PlusIcon>
              </div>
              <div
                class="p-2 w-full bg-gray-50 rounded-lg border border-gray-300"
              >
                {{ missingAnswer.answer.textSelection }}
              </div>
            </div>
          </template>

          <!-- Text answer -->
          <template v-else-if="question.type === 'text'">
            <!-- TODO Additional valid answers? Option for auto-correct or not -->

            <textarea
              :value="question.answers[0].answer"
              :id="`question${question.index}-answer1`"
              :placeholder="$t('questions.answers.label')"
              class="text-input"
              disabled
              :class="{
                'correct-input': isAnswerCorrect(question.answers[0]),
                'incorrect-input': !isAnswerCorrect(question.answers[0]),
              }"
            >
            </textarea>
            <div
              v-if="!isAnswerCorrect(question.answers[0])"
              class="mt-2 mb-2 p-2 w-full bg-gray-50 rounded-lg border border-gray-300"
            >
              {{
                $t('result.correct', {
                  value: getCorrectAnswer(question.answers[0]),
                })
              }}
            </div>
          </template>

          <!-- Single and multi-choice answer -->
          <template v-else>
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
                  disabled
                />
                <input
                  v-else
                  type="checkbox"
                  :id="`check${question.index}-${answer.index}`"
                  :value="true"
                  v-model="answer.correct"
                  disabled
                />
              </div>
              <div class="basis-full">
                <textarea
                  :value="answer.answer"
                  :id="`question${question.index}-answer${answer.index}`"
                  class="text-input"
                  disabled
                  :class="{
                    'correct-input': isAnswerCorrect(answer, question.type),
                    'incorrect-input': !isAnswerCorrect(answer, question.type),
                  }"
                >
                </textarea>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
