<template>
  <div>
    <div
      class="flex justify-center items-center w-full"
      @drop.prevent="dropHandler"
      @dragover.prevent="isDraggingOver = true"
      @dragleave="isDraggingOver = false"
    >
      <label
        for="dropzone-file"
        class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-gray-100': isDraggingOver }"
      >
        <div class="flex flex-col justify-center items-center pt-5 pb-6">
          <template v-if="file">
            <DocumentArrowUpIcon
              class="mb-3 w-10 h-10 text-gray-400"
            ></DocumentArrowUpIcon>
            <p class="text-sm text-gray-500">
              {{ file.name }}
            </p>
            <hr class="my-5 mx-auto w-36 h-px bg-gray-200 rounded border-0" />
            <p class="text-sm text-gray-500">
              <span class="font-semibold">¿Quieres subir otro documento?</span>
            </p>
            <p class="mb-2 text-sm text-gray-500">
              Haz clic o arrastra el nuevo fichero hasta aquí
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Un único PDF permitido por test
            </p>
          </template>

          <template v-else>
            <!-- <svg
              aria-hidden="true"
              class="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg> -->
            <ArrowUpTrayIcon
              class="mb-3 w-10 h-10 text-gray-400"
            ></ArrowUpTrayIcon>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Haz clic</span>
              o arrastra el fichero hasta aquí
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Un único PDF permitido por test
            </p>
          </template>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
    </div>
  </div>
</template>

<script>
import {
  DocumentArrowUpIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline';

export default {
  name: 'DocumentUploader',
  components: {
    DocumentArrowUpIcon,
    ArrowUpTrayIcon,
  },
  data() {
    return {
      file: null,
      isDraggingOver: false,
    };
  },
  methods: {
    dropHandler(event) {
      let file;
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file
        const item = event.dataTransfer.items[0];

        // If dropped item is not a file, reject it
        if (item.kind === 'file') {
          file = item.getAsFile();
          console.log('file name 1', file.name);
        }
      } else {
        // Use DataTransfer interface to access the file
        file = event.dataTransfer.files[0];
        console.log('file name 2', file.name);
      }

      if (file.type === 'application/pdf') {
        this.file = file;
      } else {
        // TODO Reject
      }

      this.isDraggingOver = false;
    },
  },
};
</script>
