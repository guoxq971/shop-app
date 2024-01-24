/**
 * 获取设备信息
 * @returns {Promise<unknown>}
 */
export function systemInfoPlugin() {
  return new Promise((resolve) => {
    uni.getSystemInfo({
      success: (res) => {
        resolve(res);
      },
    });
  });
}

export const init = {
  install: async (app) => {
    // app.config.globalProperties.$t = t;
    // app.config.globalProperties.$baseUrl = baseUrl;
    // app.config.globalProperties.$baseImgUrl = baseImgUrl;
    // app.provide(ConstantsSymbol, readonly(constants));
    uni.config = {
      _systemInfo: await systemInfoPlugin(),
      // _generateMockData: generateMockData,
      // 获取小程序下该菜单按钮的布局位置信息
      _menuButtonInfo: uni.getMenuButtonBoundingClientRect(),
      // page: 1,
      // size: 10,
      // address_is_default: 1,
    };
    // uni.$toast = toast;
    // uni.$modal = modal;
    // uni.$twoDecimal = twoDecimal;
    // uni.$arrayKeyValue = arrayKeyValue;
    // uni.$uploadFile = uploadFile;
  },
};
