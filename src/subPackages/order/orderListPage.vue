<template>
  <view class="container van-safe-area-top van-safe-area-bottom">
    <!--    状态栏及导航栏盒子-->
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar title="Order List" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <Tabs class="body-tabs">
        <Tab title="未完成" class="tabs-tab">
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
          <view>未完成的数u</view>
        </Tab>
        <Tab title="未完成">未完成</Tab>
        <Tab title="未完成">未完成</Tab>
      </Tabs>
    </view>
  </view>
</template>

<script setup>
import { NavBar, Tab, Tabs } from 'vant';
import statusBar from '@/components/statusBar/statusBar.vue';
import { onLoad } from '@dcloudio/uni-app';

const loading = (event) => {
  console.log('event', event);
  uni.showToast({ title: '加载中', icon: 'loading' });
};

const loaded = () => {
  uni.hideToast();
};

onLoad((options) => {
  console.log('options', options);
});

const onClickLeft = () => {
  uni.switchTab({
    url: '/pages/me/index',
  });
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-body {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;

    .body-tabs {
      display: flex;
      flex-direction: column;
      height: 100%;

      .tabs-tab {
        height: 100%;
        overflow: auto;
        padding: 16rpx;
        background-color: #fbfbfb;
      }
    }
  }
}

:deep(.van-tabs__content) {
  height: 100%;
  overflow: hidden;
}
</style>
