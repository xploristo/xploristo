<script>
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';

export default {
  name: 'PdfViewer',
  components: { VuePdf },
  props: {
    pdfUrl: { type: String, required: true },
  },
  data() {
    return {
      numOfPages: 0,
      page: 0,
    };
  },
  created() {
    createLoadingTask(this.pdfUrl).promise.then((pdf) => {
      this.numOfPages = pdf.numPages;
    });
  },
};
</script>

<template>
  <VuePdf v-for="page in numOfPages" :key="page" :src="pdfUrl" :page="page" />
</template>
