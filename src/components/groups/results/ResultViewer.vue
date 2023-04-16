<script>
import QuestionsViewer from './QuestionsViewer.vue';
import TopBar from '../../../components/nav/TopBar.vue';

import resultsService from '../../../services/results.service';

export default {
  name: 'ResultViewer',
  components: {
    QuestionsViewer,
    TopBar,
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
  computed: {
    assignmentName() {
      return this.result?.assignment?.name;
    },
    studentDisplayName() {
      if (this.result?.user) {
        const { firstName, lastName, email } = this.result.user;
        return firstName && lastName ? `${firstName} ${lastName}` : email;
      }
      return null;
    },
    sectionTitle() {
      return (
        this.$t('result.title') +
        (this.assignmentName ? ': ' + this.assignmentName : '') +
        (this.studentDisplayName ? ' (' + this.studentDisplayName + ')' : '')
      );
    },
  },
};
</script>

<template>
  <div>
    <TopBar :title="sectionTitle" :subsection="true"></TopBar>
    <div class="subsection">
      <questions-viewer :result="result"></questions-viewer>
    </div>
  </div>
</template>
