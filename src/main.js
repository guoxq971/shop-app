import { createSSRApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import init from '@/config/init';
import 'vant/lib/index.css';

export function createApp() {
  const app = createSSRApp(App);

  app.use(createPinia());
  app.use(init);

  return {
    app,
  };
}
