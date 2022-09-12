import { defineStore } from 'pinia';

import documentsService from '../services/documents.service.js';

export const useTestStore = defineStore('test', {
  state: () => ({
    test: {
      documentId: '629bbb2eee484acd7f5958bd',
      documentUrl: null,
      questions: [
        {
          type: 'selection',
          question:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nisl et odio posuere consequat. Mauris sed finibus nunc, eu dapibus magna. Nullam sed massa ut ex mollis molestie sed quis nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet, quam sit amet fermentum lacinia, ante tortor rutrum neque, vel blandit nisl tellus sit amet ligula. Sed sit amet consequat nisi. Cras vel rutrum diam. Aliquam tincidunt augue augue, id lacinia orci sollicitudin quis. Pellentesque ante ex, facilisis at nulla nec, accumsan aliquam magna. Praesent venenatis iaculis elit, nec scelerisque lacus iaculis quis. ',
          index: 1,
        },
      ],
      answers: [
        {
          type: 'selection',
          answer: '¡!',
          index: 1,
        },
      ],
    },
  }),
  actions: {
    async getDocumentUrl() {
      this.test.documentUrl = await documentsService.getDocumentUrl(
        this.test.documentId
      );
      return this.test.documentUrl;
    },
    saveAnswer(answer) {
      // TODO Save answers in same order as they appear? Use dict instead of array?
      this.test.answers = this.test.answers.filter(
        (a) => a.index !== answer.index
      );
      this.test.answers.push(answer);
    },
  },
  getters: {
    questions(state) {
      return state.test.questions;
    },
  },
});
