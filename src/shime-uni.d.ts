export {};

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance;
  interface ComponentCustomOptions extends Hooks {}
}

// config\init.js
declare const uni: Uni;
declare class Uni {
  config: {
    _systemInfo: any;
    // _generateMockData: Function;
    // 获取小程序下该菜单按钮的布局位置信息
    // _menuButtonInfo: Function;
    // page: number;
    // size: number;
    // address_is_default: number;
  };

  // 消息提示框
  // $toast: (text: string, duration?: number, success?: boolean) => void;

  // 模态弹窗
  // $model: (param: ModelParam) => void;

  // 保留两位小数
  // $twoDecimal: (num: number) => number;

  // 数组转对象, 以数组中的某个字段为key
  // $arrayKeyValue: (arr: Array<any>, key: string) => any;

  // 上传文件
  // $uploadFile: (param: any) => Promise<unknown>;
}
