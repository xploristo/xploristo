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
          question: '¿?',
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
