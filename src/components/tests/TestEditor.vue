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
    testId: { type: String, required: true },
    action: { type: String, required: true },
  },
  data() {
    return {
      file: null,
      documentUploadUrl: null,
      loading: false,
      createdTestId: null,
    };
  },
  setup() {
    const testStore = useTestStore();

    return { testStore };
  },
  async created() {
    if (this.testId) {
      await this.testStore.getTest(this.testId);
    }
  },
  computed: {
    name: {
      get() {
        return this.testStore.name;
      },
      set(value) {
        this.testStore.test.name = value;
      },
    },
    documentName: {
      get() {
        return this.testStore.documentName;
      },
      set(value) {
        this.testStore.test.document.path = value;
      },
    },
    questions() {
      return this.testStore.questions;
    },
    submitDisabled() {
      return !this.name.length || (this.action === 'create' && !this.file);
    },
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

      if (this.createdTestId) {
        this.$router.push('/tests/' + this.createdTestId);
      }
    },
    async submit() {
      if (this.action === 'create') {
        const { documentUploadUrl, test } = await this.testStore.createTest({
          name: this.name,
          fileName: this.file.name,
        });

        this.documentUploadUrl = documentUploadUrl;
        this.createdTestId = test._id;
        this.loading = true;
      } else {
        await testsService.updateTest(this.testId, {
          name: this.name,
          questions: this.questions,
        });
        this.$router.push('/tests');
      }
    },
  },
};
</script>

<template>
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
  </div>
</template>
