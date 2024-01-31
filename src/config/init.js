const config = {
  _systemInfo: uni.getSystemInfoSync(),
  basePathImg: 'http://img.mall4j.com/',
};

uni.config = config;
uni.$basePathImg = config.basePathImg;

const install = (Vue) => {
  // 同时挂载到uni和Vue.prototype中
  // #ifndef APP-NVUE
  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.config.globalProperties.config = config;
  // #endif
  Vue.config.globalProperties.$basePathImg = config.basePathImg;
};

export default {
  install,
};
