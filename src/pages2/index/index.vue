<!--首页-->
<template>
  <view>

    <view class="content">
      <image class="logo" src="/static/logo.png"></image>
      <view class="text-area">
        <text class="title">{{ title }}</text>
        {{ count }}
      </view>
    </view>


  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useCountStore } from '@/store/useCountStore';
import { storeToRefs } from 'pinia';
const title = ref('Hello World!');
const countStore = useCountStore();
function onClick() {
  countStore.increment();
}
const { count } = storeToRefs(countStore);
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
