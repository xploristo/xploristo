import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VuePdf from 'vue3-pdfjs';
import 'flowbite';

import App from './App.vue';
import router from './router';
import i18n, { setI18nLocale } from './plugins/i18n.js';
import permissionsPlugin from './plugins/permissions.js';
import './assets/css/base.css';
import './assets/css/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(permissionsPlugin);
app.use(VuePdf);

app.mount('#app');

// TODO Do this somewhere else
setI18nLocale('es');

function toggleTranslations(lang) {
  const debugLang = sessionStorage.getItem('debug_lang');

  if (debugLang && !lang) {
    console.info('㊗️㊗️㊗️ Exiting translations debug mode ㊗️㊗️㊗️');
    sessionStorage.removeItem('debug_lang');
  } else {
    lang = lang || 'labels';
    console.info(
      '㊗️㊗️㊗️ Entering translations debug mode with lang: ' + lang + ' ㊗️㊗️㊗️'
    );
    sessionStorage.setItem('debug_lang', lang);
  }
  location.reload();
}

window.toggleTranslations = toggleTranslations;
