<template>
  <view>me</view>
</template>

<script setup>
import { ref } from 'vue';
import { useCountStore } from '@/store/useCartTotalStore';
import { onShow } from '@dcloudio/uni-app';

const store = useCountStore();

onShow(() => {
  console.log('list', store.list);
});
</script>

<style></style>
