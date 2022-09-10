import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'flowbite';

import App from './App.vue';
import router from './router';
import i18n, { setI18nLocale } from './plugins/i18n.js';
import './assets/css/base.css';
import './assets/css/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount('#app');

// TODO Do this somewhere else
setI18nLocale('es');
