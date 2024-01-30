<!--尺码列表-->
<template>
  <view class="size-container">
    <view class="title">Size</view>
    <view class="size-list">
      <view class="size-wrap" :class="{ 'active-size': activeSize === item.id }" @click="onActiveSize(item)" v-for="item in list" :key="item.id">
        <view class="size">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
const emit = defineEmits(['select', 'update:active']);
const props = defineProps({
  list: { type: Array, default: () => [] },
  active: { type: String, default: '' },
  // row | col
  type: { type: String, default: 'row' },
});
const isCol = computed(() => props.type === 'col');

const activeSize = computed({
  get() {
    return props.active;
  },
  set(val) {
    emit('update:active', val);
  },
});
function onActiveSize(item) {
  activeSize.value = item.id;
  emit('select', item);
}
</script>

<style scoped lang="scss">
.size-container {
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 14px;
  }
  .size-list {
    display: flex;
    padding: 5px 0 0 0;
    flex-wrap: wrap;
    //overflow: auto;

    .size-wrap {
      padding: 2px 10px;
      height: 36px;
      border: 1px solid #bbb;
      border-radius: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      margin-right: 6px;
      margin-bottom: 6px;
      .size {
      }
    }
    .active-size {
      border-color: var(--primary-color);
    }
  }
}
</style>
