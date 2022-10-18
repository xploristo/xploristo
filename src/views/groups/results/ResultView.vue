<script>
import ResultViewer from '../../../components/groups/results/ResultViewer.vue';

export default {
  name: 'ResultView',
  components: {
    ResultViewer,
  },
  props: {
    resultId: { type: String, required: true },
  },
};
</script>

<template>
  <main>
    <ResultViewer :resultId="resultId"></ResultViewer>
  </main>
</template>
