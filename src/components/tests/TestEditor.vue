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
        :documentUploadUrl="documentUploadUrl"
        @fileSelected="onFileSelected"
        @fileUploaded="onFileUploaded"
      ></document-uploader>

      <div class="mt-4">
        <button
          type="submit"
          :disabled="submitDisabled"
          class="button-blue"
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
import DocumentUploader from '../documents/DocumentUploader.vue';
import ButtonSpinner from '../buttons/ButtonSpinner.vue';

import testsService from '../../services/tests.service';

export default {
  name: 'TestEditor',
  components: {
    DocumentUploader,
    ButtonSpinner,
  },
  props: {
    action: String,
  },
  data() {
    return {
      name: '',
      file: null,
      fileUploadUrl: null,
      loading: false,
    };
  },
  computed: {
    submitDisabled() {
      return !this.name.length || !this.file;
    },
  },
  methods: {
    onFileSelected(file) {
      this.file = file;
    },
    onFileUploaded() {
      this.loading = false;
      // TODO
    },
    async submit() {
      if (this.action === 'create') {
        const { documentUploadUrl } = await testsService.createTest({
          name: this.name,
          document: { type: 'pdf', path: this.file.name },
        });

        this.documentUploadUrl = documentUploadUrl;
        this.loading = true;
      } else {
        // TODO Update test
      }
    },
  },
};
</script>

// TODO https://notiz.dev/blog/floating-form-field-with-tailwindcss
