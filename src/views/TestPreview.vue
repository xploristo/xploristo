<script>
import TestViewer from '../components/tests/TestViewer.vue';

export default {
  name: 'TestView',
  components: {
    TestViewer,
  },
  props: {
    testId: String,
  },
};
</script>

<template>
  <main>
    <TestViewer :testId="testId" isPreview="true"></TestViewer>
  </main>
</template>
