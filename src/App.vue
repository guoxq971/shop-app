<script>
// import pageAnimation from './components/page-animation';
export default {
  // mixins: [pageAnimation],
  onLaunch: function () {
    console.log('App Launch');
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
@import '@/static/css/bm_common.scss';
</style>
