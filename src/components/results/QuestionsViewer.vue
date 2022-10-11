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
            <template v-if="question.answers[0].answer">
              <div
                class="mt-2 mb-2 p-2 w-full bg-gray-50 rounded-lg border border-gray-300"
              >
                {{ question.answers[0].answer?.textSelection }}
              </div>
            </template>
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
            >
            </textarea>
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
                >
                </textarea>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsViewer',
  props: {
    result: Object,
  },
};
</script>
