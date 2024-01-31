<!--颜色/风格-->
<template>
  <view class="color-style-container">
    <view class="title">Color/Style</view>
    <!--风格-->
    <view class="style-list-wrap" :class="{ 'style-list-wrap-col': isCol }">
      <view class="style-wrap" :class="{ 'active-border': item.id === activeStyle }" v-for="item in list" :key="item.id" @click="onActiveStyle(item)">
        <vanImage :src="item.url"></vanImage>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import { Image as VanImage } from 'vant';
import { useVModel } from '@vueuse/core';
const emit = defineEmits(['select', 'update:active']);
const props = defineProps({
  list: { type: Array, default: () => [] },
  active: { type: String, default: '' },
  // row | col
  type: { type: String, default: 'row' },
});
const isCol = computed(() => props.type === 'col');

const activeStyle = useVModel(props, 'active', emit);
function onActiveStyle(item) {
  activeStyle.value = item.id;
  emit('select', item);
}
</script>

<style scoped lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}

// 样式/颜色
.style-list-wrap-col {
  flex-wrap: wrap;
  padding-bottom: 0 !important;
  .style-wrap {
    margin-bottom: 12rpx;
  }
}
.color-style-container {
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 28rpx;
  }
  .active-title {
    color: var(--primary-color);
  }

  .style-list-wrap {
    display: flex;
    overflow: auto;
    padding: 10rpx 0 20rpx 0;
    .style-wrap {
      min-width: 120rpx;
      height: 120rpx;
      border: 4rpx solid #bbb;
      padding: 4rpx;
      border-radius: 2rpx;
      margin-right: 12rpx;
      .style {
        width: 100%;
        height: 100%;
      }
    }
  }

  .active-border {
    border-color: var(--primary-color) !important;
  }
}
</style>
