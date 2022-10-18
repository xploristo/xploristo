// TODO Add option to shuffle questions and/or answers for students

<script>
import QuestionsViewer from './QuestionsViewer.vue';

import resultsService from '../../../services/results.service';

export default {
  name: 'ResultViewer',
  components: {
    QuestionsViewer,
  },
  props: {
    resultId: { type: String, required: true },
  },
  data() {
    return {
      result: {},
    };
  },
  async created() {
    if (this.resultId) {
      this.result = await resultsService.getResult(this.resultId);
    }
  },
};
</script>

<template>
  <div>
    <p class="text-xl text-gray-900">{{ result?.assignment?.name }}</p>
    <questions-viewer :result="result"></questions-viewer>
  </div>
</template>
