<!--尺码列表-->
<template>
  <view class="size-container">
    <view class="title">Size</view>
    <view class="size-list">
      <view v-if="list.length === 0" class="not-data">not size</view>
      <view class="size-wrap" :class="{ 'active-size': activeSize === item.id, disabled: item.disabled }" @click="onActiveSize(item)" v-for="item in list" :key="item.id">
        <view class="size">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
const emit = defineEmits(['select', 'update:active']);
const props = defineProps({
  list: { type: Array, default: () => [] },
  active: { type: String, default: '' },
  // row | col
  type: { type: String, default: 'row' },
});
const isCol = computed(() => props.type === 'col');

const activeSize = useVModel(props, 'active', emit);

function onActiveSize(item) {
  if (item?.disabled) return;

  // 如果相同就取消选中
  if (activeSize.value === item.id) {
    activeSize.value = '';
    return;
  }

  activeSize.value = item.id;
  emit('select', item);
}
</script>

<style scoped lang="scss">
.disabled {
  filter: blur(0.6px);
}
.size-container {
  display: flex;
  flex-direction: column;

  .not-data {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20rpx;
    color: #808080;
  }
  .title {
    font-weight: bold;
    font-size: 28rpx;
  }
  .size-list {
    display: flex;
    padding: 10rpx 0 0 0;
    flex-wrap: wrap;
    //overflow: auto;

    .size-wrap {
      padding: 4rpx 20rpx;
      height: 72rpx;
      border: 2rpx solid #bbb;
      border-radius: 2rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26rpx;
      margin-right: 12rpx;
      margin-bottom: 12rpx;
      .size {
      }
    }
    .active-size {
      border-color: var(--primary-color);
    }
  }
}
</style>
