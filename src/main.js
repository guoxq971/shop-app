import { createSSRApp } from 'vue';
import App from './App.vue';

import uviewPlus from 'uview-plus';
import { createPinia } from 'pinia';
import { init } from '@/config/init';

export function createApp() {
  const app = createSSRApp(App);

  app.use(createPinia());
  app.use(uviewPlus);
  app.use(init);

  return {
    app,
  };
}
