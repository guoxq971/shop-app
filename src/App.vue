<script>
// import pageAnimation from './components/page-animation';
import { useSystemInfo } from '@/store/useSystemInfo'
export default {
  // mixins: [pageAnimation],
  onLaunch: function () {
    console.log('App Launch');
    const store = useSystemInfo()
    store.getSystemInfo()
  },
  onShow: function () {
    console.log('App Show');

    // 隐藏底部导航栏
    // uni.hideTabBar({ animation: false });
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/css/bm_common.scss';
</style>
