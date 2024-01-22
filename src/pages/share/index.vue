<!--首页-->
<template>
  <view>
    <!--顶部导航栏-->
    <bmNavbar title="share" />
    <u-button @click="onClick2">test</u-button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useCountStore } from '@/store/useCountStore';
import { storeToRefs } from 'pinia';
import bmNavbar from '@/components/bm/navbar/navbar.vue';
import bmTabbar from '@/components/bm/tabbar/tabbar.vue';
const title = ref('Hello World!');
const countStore = useCountStore();
function onClick() {
  countStore.increment();
}
const { count } = storeToRefs(countStore);

function onClick2() {
  uni.navigateTo({ url: '/subPackages/share/test' });
}
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
