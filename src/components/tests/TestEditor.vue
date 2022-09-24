<template>
  <div>
    <label for="name" class="input-label">{{ $t('test.form.name') }}</label>
    <input
      type="text"
      id="name"
      v-model="name"
      class="text-input"
      :placeholder="$t('test.form.name')"
      required=""
    />

    <p class="input-label mt-4">{{ $t('document.title') }}</p>
    <document-uploader :fileSelected="onFileSelected"></document-uploader>

    <div class="mt-4">
      <button @click="submit()" class="button-blue">
        {{ action === 'create' ? $t('test.create') : $t('test.save') }}
      </button>
    </div>

    <!-- TODO Edit questions -->
  </div>
</template>

// TODO Add option to shuffle questions and/or answers for students

<script>
import DocumentUploader from '../documents/DocumentUploader.vue';

export default {
  name: 'TestEditor',
  components: {
    DocumentUploader,
  },
  props: {
    action: String,
  },
  data() {
    return {
      name: '',
      document: null,
    };
  },
  methods: {
    onFileSelected(file) {
      console.log('a', file);
    },
    submit() {
      if (this.action === 'create') {
        // TODO Create test
      } else {
        // TODO Update test
      }
    },
  },
};
</script>

// TODO https://notiz.dev/blog/floating-form-field-with-tailwindcss
