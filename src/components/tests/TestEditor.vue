<template>
  <!-- TODO test-creator vs test-editor -->
  <div>
    <form @submit.prevent="submit">
      <label for="name" class="input-label">{{ $t('test.form.name') }}</label>
      <input
        type="text"
        id="name"
        v-model="name"
        class="text-input"
        :placeholder="$t('test.form.name')"
        required
      />

      <p class="input-label mt-4">{{ $t('document.title') }}</p>
      <!-- TODO Change this for test edit -->
      <document-uploader
        :documentName="documentName"
        :documentUploadUrl="documentUploadUrl"
        @fileSelected="onFileSelected"
        @fileUploaded="onFileUploaded"
      ></document-uploader>

      <template v-if="action === 'update'">
        <p class="input-label mt-4">{{ $t('questions.title') }}</p>
        <questions-editor :testId="testId"></questions-editor>
      </template>

      <div class="mt-4">
        <button
          type="submit"
          :disabled="submitDisabled"
          class="button-blue mb-4"
          :class="{
            'button-disabled': submitDisabled,
            'button-loading': loading,
          }"
        >
          <button-spinner v-if="loading"></button-spinner>
          {{ action === 'create' ? $t('test.create') : $t('test.save') }}
        </button>
      </div>
    </form>

    <!-- TODO Edit questions -->
  </div>
</template>

// TODO Add option to shuffle questions and/or answers for students

<script>
import ButtonSpinner from '../buttons/ButtonSpinner.vue';
import DocumentUploader from '../documents/DocumentUploader.vue';
import QuestionsEditor from './QuestionsEditor.vue';

import { useTestStore } from '../../stores/test.js';
import testsService from '../../services/tests.service';

export default {
  name: 'TestEditor',
  components: {
    ButtonSpinner,
    DocumentUploader,
    QuestionsEditor,
  },
  props: {
    action: { type: String, default: 'create' },
    testId: { type: String, required: false },
  },
  data() {
    return {
      file: null,
      documentUploadUrl: null,
      documentName: null,
      loading: false,
    };
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  computed: {
    name() {
      return this.testStore.name;
    },
    questions() {
      return this.testStore.questions;
    },
    submitDisabled() {
      return !this.name.length || (this.action === 'create' && !this.file);
    },
  },
  async mounted() {
    const testStore = useTestStore();
    await testStore.getTest(this.testId);
    this.name = testStore.name;
    this.documentName = testStore.documentName;
  },
  methods: {
    async onFileSelected(file) {
      this.file = file;
      if (this.action === 'update') {
        // TODO Show confirm modal
        const { documentUploadUrl } = await testsService.updateTestDocument(
          this.testId,
          { type: 'application/pdf', path: this.file.name }
        );
        this.documentUploadUrl = documentUploadUrl;
      }
    },
    onFileUploaded() {
      this.loading = false;
      this.documentName = this.file.name;
      // TODO
    },
    async submit() {
      if (this.action === 'create') {
        const { documentUploadUrl } = await testsService.createTest({
          name: this.name,
          document: { type: 'application/pdf', path: this.file.name },
        });

        this.documentUploadUrl = documentUploadUrl;
        this.loading = true;
      } else {
        await testsService.updateTest(this.testId, {
          name: this.name,
          questions: this.questions,
        });
      }
    },
  },
};
</script>
