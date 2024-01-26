import {defineStore} from 'pinia'
import {reactive} from 'vue'

export const useSystemInfo = defineStore('systemInfo',()  =>{
  const sInfo = reactive({
    statusBarHeight: 0 ,// 手机状态栏的高度
    windowHeight: 0 ,// 可使用窗口高度
    windowWidth: 0 ,// 可使用窗口宽度
    windowTop: 0,// 可使用窗口的顶部位置
    windowBottom: 0,// 可使用窗口的底部位置
    navBarHeight: 44,// 导航栏高度
    tabBarHeight: 50, // 标签栏的高度
    navBarWidth: 0, // 导航栏的宽度,在小程序状态下,要减去胶囊的宽度

  })
  const getSystemInfo = () =>{
    uni.getSystemInfo({
      success: (res) => {
        sInfo.statusBarHeight = res.statusBarHeight
        sInfo.windowHeight = res.windowHeight
        sInfo.windowWidth = res.windowWidth
        sInfo.windowTop = res.windowTop
        sInfo.windowBottom = res.windowBottom
        //h5 app mp-ali
        // #ifndef APP || H5 || MP-ALIPAY
        // 获取胶要的位置
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        sInfo.navBarHeight =(menuButtonInfo.bottom - res.statusBarHeight)+(menuButtonInfo.top - res.statusBarHeight)
        sInfo.navBarWidth = menuButtonInfo.left
        // #endif
      }
    })
  }
  return {
    sInfo,
    getSystemInfo
  }
})