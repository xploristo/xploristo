<template>
  <div>
    <div
      class="document-uploader-container"
      @drop.prevent="dropHandler"
      @dragover.prevent="isDraggingOver = true"
      @dragleave="isDraggingOver = false"
    >
      <label
        for="dropzone-file"
        class="document-uploader-dropzone"
        :class="{ 'bg-gray-100': isDraggingOver }"
      >
        <div class="document-uploader-content">
          <template v-if="file || documentName">
            <DocumentArrowUpIcon
              v-if="file"
              class="document-uploader-icon"
            ></DocumentArrowUpIcon>
            <DocumentIcon v-else class="document-uploader-icon"></DocumentIcon>
            <p class="text-sm text-gray-900">
              {{ file?.name || documentName }}
            </p>
            <hr class="document-uploader-separator" />
            <p class="text-sm text-gray-500">
              <span class="font-semibold">¿Quieres subir otro documento?</span>
            </p>
            <p class="mb-2 text-sm text-gray-500">
              Haz clic o arrastra el nuevo fichero hasta aquí
            </p>
            <p class="text-xs text-gray-500">Un único PDF permitido por test</p>
          </template>

          <template v-else>
            <ArrowUpTrayIcon
              class="mb-3 w-10 h-10 text-gray-400"
            ></ArrowUpTrayIcon>
            <p class="mb-2 text-sm text-gray-500">
              <span class="font-semibold">Haz clic</span>
              o arrastra el fichero hasta aquí
            </p>
            <p class="text-xs text-gray-500">Un único PDF permitido por test</p>
          </template>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="application/pdf"
          class="hidden"
          @change="onFileSelected"
        />
      </label>
    </div>
  </div>
</template>

<script>
import {
  DocumentIcon,
  DocumentArrowUpIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline';
import documentsService from '../../services/documents.service';

export default {
  name: 'DocumentUploader',
  components: {
    DocumentIcon,
    DocumentArrowUpIcon,
    ArrowUpTrayIcon,
  },
  props: {
    documentName: {
      type: String,
      default: null,
    },
    documentUploadUrl: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      file: null,
      isDraggingOver: false,
    };
  },
  watch: {
    documentUploadUrl() {
      if (this.documentUploadUrl) {
        this.uploadFile();
      }
    },
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];

      if (file.type === 'application/pdf') {
        this.file = file;
        this.$emit('fileSelected', this.file);
      } else {
        // TODO Reject
      }
    },
    dropHandler(event) {
      let file;
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file
        const item = event.dataTransfer.items[0];

        // If dropped item is not a file, reject it
        if (item.kind === 'file') {
          file = item.getAsFile();
        }
      } else {
        // Use DataTransfer interface to access the file
        file = event.dataTransfer.files[0];
      }

      if (file.type === 'application/pdf') {
        this.file = file;
        this.$emit('fileSelected', this.file);
      } else {
        // TODO Reject
      }

      this.isDraggingOver = false;
    },
    async uploadFile() {
      await documentsService.uploadDocument(this.documentUploadUrl, this.file);
      this.$emit('fileUploaded');
    },
  },
};
</script>
