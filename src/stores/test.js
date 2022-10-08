import { defineStore } from 'pinia';

import testsService from '../services/tests.service.js';

export const useTestStore = defineStore('test', {
  // TODO Maintain data in local storage for unwanted refresh? 🤔
  state: () => ({
    test: {
      name: '',
      document: {},
      documentDownloadUrl: null,
      questions: [],
    },
  }),
  actions: {
    clear() {
      /* this.test._id = null; */
      this.test.name = '';
      this.test.document = {};
      this.test.documentDownloadUrl = null;
      this.test.questions = [];
    },
    async createTest({ name, fileName }) {
      const testData = await testsService.createTest({
        name: name,
        document: { type: 'application/pdf', path: fileName },
      });
      const { documentUploadUrl, ...test } = testData;
      this.test = test;

      return { documentUploadUrl, test };
    },
    async getTest(testId) {
      /* if (testId !== this.test._id) { */
      // TODO Send home (or not found page) if test not found
      this.test = await testsService.getTest(testId);
      /* } */
    },
    addQuestion(question) {
      this.test.questions.push(question);
    },
    deleteQuestion(questionIndex) {
      this.test.questions.splice(questionIndex, 1);
      this.test.questions.forEach((question, index) => {
        question.index = index;
      });
    },
    addAnswer(questionIndex, answer) {
      this.test.questions[questionIndex].answers.push(answer);
    },
    saveAnswer(questionIndex, answer) {
      this.test.questions[questionIndex].answers[answer.index] = answer;
    },
    saveAnswers(questionIndex, answers) {
      this.test.questions[questionIndex].answers = answers;
    },
  },
  getters: {
    name(state) {
      console.log('??', state.test.name);
      return state.test.name;
    },
    questions(state) {
      return state.test.questions;
    },
    documentName(state) {
      return state.test.document?.path;
    },
    documentDownloadUrl(state) {
      return state.test.documentDownloadUrl;
    },
  },
});
