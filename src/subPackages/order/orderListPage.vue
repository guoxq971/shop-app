<template>
  <view class="container van-safe-area-top van-safe-area-bottom">
    <!--    状态栏及导航栏盒子-->
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar title="Confirm the Order" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
  </view>
</template>

<script setup>
import { NavBar } from 'vant';
import statusBar from '@/components/statusBar/statusBar.vue';

const onClickLeft = () => {
  uni.switchTab({
    url: '/pages/me/index',
  });
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
}
</style>
