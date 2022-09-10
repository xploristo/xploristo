<template>
  <div>
    <file-pond
      name="test"
      ref="pond"
      allow-multiple="false"
      v-bind:server="myServer"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    ></file-pond>
  </div>
</template>

<script>
// https://pqina.nl/filepond/
// https://github.com/pqina/vue-filepond/blob/master/example/src/components/HelloWorld.vue
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond();

// FIXME allow-multiple="false" is not working properly

export default {
  name: 'DocumentUploader',
  components: {
    FilePond,
  },
  data() {
    return {
      myServer: {
        process: (fieldName, file, metadata, load) => {
          // TODO What is 'this'
          this.a(file);

          console.log('fieldName', fieldName);
          console.log('file', file);
          console.log('metadata', metadata);
          // TODO
          // Simulates uploading a file, actual file will be uploaded after saving the test
          setTimeout(() => {
            load(Date.now());
          }, 1500);
        },
        load: (source, load) => {
          // TODO
          // Simulates loading a file from the server
          fetch(source)
            .then((res) => res.blob())
            .then(load);
        },
      },
      myFiles: [],
    };
  },
  methods: {
    handleFilePondInit() {
      // TODO
      console.log('FilePond has initialized');
    },
    a(file) {
      console.log('???');
      this.$emit('fileSelected', file);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
