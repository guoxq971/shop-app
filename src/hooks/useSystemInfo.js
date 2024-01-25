/**
 * 获取系统信息
 * @returns {{phoneWidth: number, phoneHeight: number, phoneModel: string, isIOS: boolean, statusHeight: number}}
 */
export function useSystemInfo() {
  //信息
  // const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  let { _systemInfo: systemInfo } = uni.config;
  console.log('设备信息', systemInfo, uni.config);
  // console.log('设备信息', menuButtonInfo, systemInfo, uni.config);

  // 状态栏高度
  const statusHeight = systemInfo.statusBarHeight;
  // const capAndStatusHeight = menuButtonInfo.top + menuButtonInfo.height;
  // 胶囊高度
  // const capHeight = menuButtonInfo.height;
  // 胶囊距离头部高度
  // const capTop = menuButtonInfo.top;
  // 底部高度
  // const bottomHeight = systemInfo.windowHeight - menuButtonInfo.bottom;
  // 手机宽度
  let phoneWidth = systemInfo.windowWidth;
  // 手机高度
  const phoneHeight = systemInfo.windowHeight;
  // 手机型号
  const phoneModel = systemInfo.model;
  // 是否是ios状态
  const isIOS = systemInfo.platform.toLowerCase() === 'ios';
  // 导航栏的高度
  let navBarHeight = 44
  // 标签栏的高度(底部导航栏的高度)
  let tabBarHeight = 50
  //h5 app mp-ali
  // #ifndef APP || H5 || MP-ALIPAY
  // 获取胶要的位置
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  navBarHeight =(menuButtonInfo.bottom - systemInfo.statusBarHeight)+(menuButtonInfo.top - systemInfo.statusBarHeight)
  phoneWidth = menuButtonInfo.left
  // #endif
  return {
    // capAndStatusHeight,
    // capHeight,
    // capTop,
    // bottomHeight,
    statusHeight,
    phoneWidth,
    phoneHeight,
    phoneModel,
    isIOS,
    navBarHeight,
    tabBarHeight
  };
}
