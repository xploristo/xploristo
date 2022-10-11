<script>
import ResultViewer from '../components/results/ResultViewer.vue';

export default {
  name: 'ResultView',
  components: {
    ResultViewer,
  },
  props: {
    resultId: String,
  },
};
</script>

<template>
  <main>
    <ResultViewer :resultId="resultId"></ResultViewer>
  </main>
</template>
