/// <reference types='@dcloudio/types' />
import 'vue';

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance;

  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  const $basePathImg: string;
}

// config\init.js
declare const uni: Uni;
declare class Uni {
  config: any;
  $basePathImg: string;
}
