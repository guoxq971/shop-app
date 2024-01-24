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
    tabBarHeight: 50 // 标签栏的高度
  })
  const getSystemInfo = () =>{
    uni.getSystemInfo({
      success: (res) => {
        sInfo.statusBarHeight = res.statusBarHeight
        sInfo.windowHeight = res.windowHeight
        sInfo.windowWidth = res.windowWidth
        sInfo.windowTop = res.windowTop
        sInfo.windowBottom = res.windowBottom
      }
    })
  }
  return {
    sInfo,
    getSystemInfo
  }
})