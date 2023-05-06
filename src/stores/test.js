import { defineStore } from 'pinia';

import testsService from '../services/tests.service.js';
import { useAssignmentStore } from './assignment.js';

export const useTestStore = defineStore('test', {
  state: () => ({
    // TODO Save assignmentId and groupId in state?
    test: {
      _id: null,
      name: '',
      document: {},
      // TODO Get documentDownloadUrl again after it expires?
      documentDownloadUrl: null,
      questions: [],
    },
  }),
  actions: {
    clear() {
      this.test._id = null;
      this.test.name = '';
      this.test.document = {};
      this.test.documentDownloadUrl = null;
      this.test.questions = [];
    },
    async getTest(testId, assignmentId, groupId) {
      if (testId) {
        // TODO Send home (or not found page) if test not found
        if (testId !== this.test._id) {
          this.test = await testsService.getTest(testId);
        }
      } else if (assignmentId) {
        const assignmentStore = useAssignmentStore();
        await assignmentStore.getAssignment(groupId, assignmentId);
        this.test = assignmentStore.test;
      }
    },
    async getDocumentDownloadUrl(testId, assignmentId, groupId) {
      if (testId) {
        if (testId !== this.test._id || !this.test.documentDownloadUrl) {
          this.test.documentDownloadUrl =
            await testsService.getTestDocumentDownloadUrl(testId);
        }
      } else if (assignmentId) {
        const assignmentStore = useAssignmentStore();
        this.test.documentDownloadUrl =
          await assignmentStore.getTestDocumentDownloadUrl(
            groupId,
            assignmentId
          );
      }
    },
    async createTest({ name, fileName }) {
      const testData = await testsService.createTest({
        name: name,
        document: { type: 'application/pdf', name: fileName },
      });
      const { documentUploadUrl, ...test } = testData;
      this.test = test;

      return { documentUploadUrl, test };
    },
    async updateTest(testId, assignmentId, groupId, { name, questions }) {
      if (testId) {
        await testsService.updateTest(testId, { name, questions });
      } else if (assignmentId) {
        const assignmentStore = useAssignmentStore();
        await assignmentStore.updateAssignmentTest(groupId, assignmentId, {
          name,
          questions,
        });
      }
    },
    async updateTestDocument(testId, assignmentId, groupId, document) {
      if (testId) {
        return testsService.updateTestDocument(testId, document);
      } else if (assignmentId) {
        const assignmentStore = useAssignmentStore();
        return assignmentStore.updateAssignmentTestDocument(
          groupId,
          assignmentId,
          document
        );
      }
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
    moveQuestionUp(questionIndex) {
      if (questionIndex > 0 && this.test.questions.length > 1) {
        const previousQuestion = this.test.questions[questionIndex - 1];
        previousQuestion.index = questionIndex;

        this.test.questions[questionIndex - 1] =
          this.test.questions[questionIndex];
        this.test.questions[questionIndex - 1].index = questionIndex - 1;

        this.test.questions[questionIndex] = previousQuestion;
      }
    },
    moveQuestionDown(questionIndex) {
      if (
        this.test.questions.length > 1 &&
        questionIndex < this.test.questions.length - 1
      ) {
        const nextQuestion = this.test.questions[questionIndex + 1];
        nextQuestion.index = questionIndex;

        this.test.questions[questionIndex + 1] =
          this.test.questions[questionIndex];
        this.test.questions[questionIndex + 1].index = questionIndex + 1;

        this.test.questions[questionIndex] = nextQuestion;
      }
    },
    addAnswer(questionIndex, answer) {
      this.test.questions[questionIndex].answers.push(answer);
    },
    deleteAnswer(questionIndex, answerIndex) {
      if (this.test.questions[questionIndex].answers.length > 1) {
        this.test.questions[questionIndex].answers.splice(answerIndex, 1);
        this.test.questions[questionIndex].answers.forEach((answer, index) => {
          answer.index = index;
        });
      }
    },
    moveAnswerUp(questionIndex, answerIndex) {
      if (
        answerIndex > 0 &&
        this.test.questions[questionIndex].answers.length > 1
      ) {
        const previousAnswer =
          this.test.questions[questionIndex].answers[answerIndex - 1];
        previousAnswer.index = answerIndex;

        this.test.questions[questionIndex].answers[answerIndex - 1] =
          this.test.questions[questionIndex].answers[answerIndex];
        this.test.questions[questionIndex].answers[answerIndex - 1].index =
          answerIndex - 1;

        this.test.questions[questionIndex].answers[answerIndex] =
          previousAnswer;
      }
    },
    moveAnswerDown(questionIndex, answerIndex) {
      if (
        this.test.questions[questionIndex].answers.length > 1 &&
        answerIndex < this.test.questions[questionIndex].answers.length - 1
      ) {
        const nextAnswer =
          this.test.questions[questionIndex].answers[answerIndex + 1];
        nextAnswer.index = answerIndex;

        this.test.questions[questionIndex].answers[answerIndex + 1] =
          this.test.questions[questionIndex].answers[answerIndex];
        this.test.questions[questionIndex].answers[answerIndex + 1].index =
          answerIndex + 1;

        this.test.questions[questionIndex].answers[answerIndex] = nextAnswer;
      }
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
      return state.test.name;
    },
    questions(state) {
      return state.test.questions;
    },
    documentName(state) {
      return state.test.document?.name;
    },
    documentDownloadUrl(state) {
      return state.test.documentDownloadUrl;
    },
    testValidationErrors(state) {
      let errors = [];

      state.test.questions.forEach((question) => {
        if (!question.question) {
          errors.push({
            questionIndex: question.index,
            reason: 'emptyQuestion',
          });
        }

        let isCorrectAnswerSelected = false;
        question.answers.forEach((answer) => {
          if (question.type === 'selection') {
            isCorrectAnswerSelected = true;
            if (!answer.answer?.textSelection) {
              errors.push({
                questionIndex: question.index,
                reason: 'emptySelectionAnswer',
              });
            }
          } else if (question.type === 'text') {
            isCorrectAnswerSelected = true;
            if (!answer.answer) {
              errors.push({
                questionIndex: question.index,
                reason: 'emptyTextAnswer',
              });
            }
          } else {
            if (answer.correct) {
              isCorrectAnswerSelected = true;
            }
            if (!answer.answer) {
              errors.push({
                questionIndex: question.index,
                answerIndex: answer.index,
                reason: 'emptyChoiceAnswer',
              });
            }
          }
        });

        if (!isCorrectAnswerSelected) {
          errors.push({
            questionIndex: question.index,
            reason: 'noCorrectAnswerSelected',
          });
        }
      });

      return errors;
    },
  },
});
