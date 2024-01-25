<!--自适应盒子-->
<template>
  <view class="bm-adaption-item" :style="{ width }">
    <view class="bm-item-box-bd">
      <view class="item-box">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  width: { type: String, default: '100%', required: true },
});
</script>

<style scoped lang="scss">
.bm-adaption-item {
  //width: 50%;
  .bm-item-box-bd {
    padding-bottom: 100%;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    .item-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
