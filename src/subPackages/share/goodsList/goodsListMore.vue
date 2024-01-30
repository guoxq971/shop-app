<!--产品列表-更多-->
<template>
  <view class="list-wrap">
    <GoodsList :list="list" type="col" />

    <!--更多-->
    <view class="more" v-if="isMore">
      <view @click="onMore" class="more-btn">
        <text class="text">LOAD MORE PRODUCTS</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import GoodsList from '@/subPackages/share/goodsList/goodsList.vue';
import { ref } from 'vue';
import { randomTool } from '@/utils/commom';
import { useVModel } from '@vueuse/core';

const emit = defineEmits(['update:list']);
const props = defineProps({
  list: { type: Array, default: () => [] },
});
const list = useVModel(props, 'list', emit);

// 加载更多
const isMore = ref(true);
function onMore() {
  if (list.value.length >= 30) {
    uni.showToast({
      title: '没有更多了',
      icon: 'none',
    });
    isMore.value = false;
    return;
  }
  list.value = [...list.value, ...randomTool.goodsList(10)];
}
</script>

<style scoped lang="scss">
.list-wrap {
  display: flex;
  flex-wrap: wrap;

  .more {
    margin-top: 26rpx;
    margin-bottom: 10rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    .more-btn {
      border: 2rpx solid #4d4d4d;
      padding: 26rpx 64rpx;
      font-size: 26rpx;
      .text {
        transform: scale(1, 1.7);
        transform-origin: 0 12rpx;
        display: inline-block;
        width: fit-content;
        height: fit-content;
      }
    }
  }
}
</style>
