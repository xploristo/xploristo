<template>
  <div>
    <p>{{ $t('document.title') }}</p>

    <document-uploader :fileSelected="onFileSelected"></document-uploader>

    <p>{{ $t('questions.title') }}</p>

    <div class="flex space-x-4">
      <button @click="addQuestion('text')" class="btn btn-blue flex-1">
        {{ $t('questions.add.text') }}
      </button>
      <button @click="addQuestion('singleChoice')" class="btn btn-blue flex-1">
        {{ $t('questions.add.singleChoice') }}
      </button>
      <button @click="addQuestion('multiChoice')" class="btn btn-blue flex-1">
        {{ $t('questions.add.multiChoice') }}
      </button>
    </div>

    <div v-for="question in questions" v-bind:key="question.index">
      <div class="relative mt-5 mb-5 p-5 rounded-md border border-gray-600">
        <h2
          class="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span class="bg-white px-2 text-sm font-medium">{{
            $t('questions.question.title', { index: question.index + 1 })
          }}</span>
        </h2>

        <div>
          <!-- Question text -->
          <label :for="`question${question.index}`">{{
            $t('questions.question.text')
          }}</label>
          <textarea
            v-model="question.question"
            :id="`question+${question.index}`"
            :placeholder="$t('questions.question.placeholder')"
            class="text-input"
          >
          </textarea>

          <!-- TODO Allow deleting answers -->
          <!-- TODO Allow reordering answers -->

          <!-- Question answers -->
          <div v-if="question.type === 'text'">
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
          </div>

          <div v-else>
            <p>{{ $t('questions.answers.title') }}</p>

            <div
              v-for="answer in question.answers"
              v-bind:key="answer.index"
              class="flex flex-row"
            >
              <!-- <label
                  v-if="answer.answer.length > 0"
                  :for="`question${question.index}-answer${answer.index}`"
                  >{{
                    $t('questions.answers.multiLabel', {
                      index: answer.index + 1,
                    })
                  }}</label
                > -->
              <div class="mr-3 mt-1 py-2">
                <input
                  v-if="question.type === 'singleChoice'"
                  type="radio"
                  :name="question.index"
                  :value="answer.index"
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
            </div>

            <button @click="addAnswer(question.index)">
              {{ $t('questions.answers.add') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <button @click="submit()" class="btn btn-blue">
        {{ action === 'create' ? $t('test.create') : $t('test.save') }}
      </button>
    </div>
  </div>
</template>

// TODO Add option to shuffle questions and/or answers for students

<script>
import DocumentUploader from '../documents/DocumentUploader.vue';

export default {
  name: 'TestEditor',
  components: {
    DocumentUploader,
  },
  props: {
    action: String,
  },
  data() {
    return {
      questions: [],
      document: null, // TODO
    };
  },
  methods: {
    addQuestion(type) {
      this.questions.push({
        index: this.questions.length,
        question: '',
        type: type,
        answers: [
          {
            index: 0,
            answer: '',
            correct: type === 'text' ? true : false,
          },
        ],
      });
    },
    addAnswer(questionIndex) {
      this.questions[questionIndex].answers.push({
        index: this.questions[questionIndex].answers.length,
        answer: '',
        correct: false,
      });
    },
    onSingleChoiceAnswerChange(event, questionIndex) {
      const answerIndex = +event.target.value;
      this.questions[questionIndex].answers.forEach((answer) => {
        answer.correct = answer.index === answerIndex;
      });
    },
    onFileSelected(file) {
      console.log('a', file);
    },
    submit() {
      if (this.action === 'create') {
        // TODO Create test
        console.log('questions', this.questions);
      } else {
        // TODO Update test
      }
    },
  },
};
</script>

// TODO https://notiz.dev/blog/floating-form-field-with-tailwindcss

<style scoped>
.btn {
  @apply rounded py-2 px-4;
}
.btn-blue {
  @apply bg-blue-100;
}
.btn-blue:hover {
  @apply bg-blue-200;
}

.text-input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 mt-1 mb-2 text-gray-700 leading-tight;
}
.text-input:focus {
  @apply outline-none;
}
</style>
