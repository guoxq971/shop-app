<template>
  <view class="container">
    <view class="header-bar">
      <NavBar title="Confirm the Order"
              left-text="Back"
              left-arrow
              @click-left="onClickLeft"></NavBar>
    </view>
    <view class="container-body">
      <view>
        <view>Shipping Address</view>
      </view>
    </view>
    <view class="container-footer">底部</view>
  </view>

</template>

<script setup>
import { NavBar } from 'vant';

import{ref} from 'vue'
import {useSystemInfo} from '@/hooks/useSystemInfo'
const { statusHeight,navBarHeight } = useSystemInfo()

// 状态栏高度 + px
const SHHeight = ref(statusHeight + 'px')
// 导航栏高度  + px
const NAHeight = ref(navBarHeight + 'px')
// 状态栏 + 导航栏的高度  + px
const SWNHeight = ref(statusHeight + navBarHeight + 'px')

const onClickLeft = () => {
 uni.navigateBack({
   delta: 1
 })
}

</script>



<style scoped lang="scss">

.container{
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header-bar{
    height: v-bind(SWNHeight);
    /* #ifdef APP */
    height:  v-bind(NAHeight);
    /* #endif */
    overflow: hidden;
  }

  .container-body{
    //height: calc(100vh - v-bind(SWNHeight));
    border: 1px solid red;
    ///* #ifdef APP */
    //height: calc(100vh - v-bind(NAHeight));
    ///* #endif */
    //padding: 16rpx;
    //background-color: #edeff6;
    flex: 1;
    overflow: auto;
  }

  .container-footer{

  }
}

</style>