<template>
  <div>
    <div>{{ question.question }}</div>
    <div>Question type {{ question.type }}</div>

    <div v-if="question.type === 'selection'">
      <button type="button" class="btn-blue" @click="saveSelection">
        {{ $t('test.saveSelection') }}
      </button>
      <selection-question></selection-question>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestQuestion',
  props: {
    question: {
      required: true,
    },
  },
  methods: {
    saveSelection() {
      const selection = document.getSelection();
      console.log('selection', selection.toString());
      console.log(selection);
    },
  },
};
</script>
