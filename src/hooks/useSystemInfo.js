/**
 * 获取系统信息
 * @returns {{phoneWidth: number, phoneHeight: number, phoneModel: string, isIOS: boolean, statusHeight: number}}
 */
export function useSystemInfo() {
  //信息
  let { _systemInfo: systemInfo } = uni.config;
  console.log('设备信息', systemInfo, uni.config);

  // 状态栏高度
  const statusHeight = systemInfo.statusBarHeight;
  // 手机宽度
  const phoneWidth = systemInfo.windowWidth;
  // 手机高度
  const phoneHeight = systemInfo.windowHeight;
  // 手机型号
  const phoneModel = systemInfo.model;
  // 是否是ios状态
  const isIOS = systemInfo.platform.toLowerCase() === 'ios';

  return {
    statusHeight,
    phoneWidth,
    phoneHeight,
    phoneModel,
    isIOS,
  };
}
