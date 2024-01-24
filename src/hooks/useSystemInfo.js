/**
 * 获取系统信息
 * @returns {{phoneHeight: *, phoneModel: *, capAndStatusHeight: *, capHeight: *, capTop: *, bottomHeight: number, phoneWidth: *, isIOS: boolean}}
 */
export function useSystemInfo() {
  //信息
  let { _systemInfo: systemInfo, _menuButtonInfo: menuButtonInfo } = uni.config;
  console.log('设备信息', menuButtonInfo, systemInfo, uni.config);

  // 胶囊和状态栏高度
  const capAndStatusHeight = menuButtonInfo.top + menuButtonInfo.height;
  // 胶囊高度
  const capHeight = menuButtonInfo.height;
  // 胶囊距离头部高度
  const capTop = menuButtonInfo.top;
  // 底部高度
  const bottomHeight = systemInfo.windowHeight - menuButtonInfo.bottom;
  // 手机宽度
  const phoneWidth = systemInfo.windowWidth;
  // 手机高度
  const phoneHeight = systemInfo.windowHeight;
  // 手机型号
  const phoneModel = systemInfo.model;
  // 是否是ios状态
  const isIOS = systemInfo.platform.toLowerCase() === 'ios';

  return {
    capAndStatusHeight,
    capHeight,
    capTop,
    bottomHeight,
    phoneWidth,
    phoneHeight,
    phoneModel,
    isIOS,
  };
}
