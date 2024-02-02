<template>
  <view class="go-back" @click="onGoBack">
    <Icon name="arrow-left"></Icon>
    <text>BACK</text>
  </view>
</template>

<script setup>
import { Icon } from 'vant';
// 返回上一页
function onGoBack() {
  uni.navigateBack();
}
</script>

<style scoped lang="scss">
// 返回上一页
.go-back {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  z-index: 1;
  background: #000;
  color: #fff;
  padding: 14rpx;
  font-size: 24rpx;
}
</style>
