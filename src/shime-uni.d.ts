export {};

declare module 'vue' {
  // @ts-ignore
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks {}
}

// config\init.js
declare const uni: Uni;
declare class Uni {
  config: {
    _systemInfo: {
      statusHeight: number; // 状态栏高度
    };
  };
}
