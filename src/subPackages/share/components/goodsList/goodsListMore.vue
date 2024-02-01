<!--产品列表-更多-->
<template>
  <view class="list-wrap">
    <GoodsList :list="list" type="col" />

    <!--更多-->
    <view class="more" v-if="isMore && list.length > 0">
      <view @click="onMore" class="more-btn">
        <text class="text">LOAD MORE PRODUCTS</text>
      </view>
    </view>
    <!--暂无数据-->
    <view class="not-data" v-if="list.length === 0">athere is no data</view>
  </view>
</template>

<script setup>
import GoodsList from '@/subPackages/share/components/goodsList/goodsList.vue';
import { ref } from 'vue';
import { randomTool } from '@/utils/commom';
import { useVModels } from '@vueuse/core';

const emit = defineEmits(['update:list', 'update:param']);
const props = defineProps({
  list: { type: Array, default: () => [] },
  param: { type: Object, default: () => ({ pageNum: 1, pageSize: 10 }) },
  getList: { type: Function, default: () => {} },
});
const { list, param } = useVModels(props, emit);

// 加载更多
const isMore = ref(true);
async function onMore() {
  if (isMore.value) {
    param.value.pageNum += 1;
    const l = await props.getList(true);

    if (l.length === 0) {
      isMore.value = false;
      uni.showToast({
        title: 'No more data',
        icon: 'none',
      });
      return;
    }

    list.value = [...list.value, ...l];
  }
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
      padding: 20rpx 60rpx;
      font-size: 26rpx;
      .text {
        transform: scale(1, 1.6);
        transform-origin: 0 12rpx;
        display: inline-block;
        width: fit-content;
        height: fit-content;
      }
    }
  }

  .not-data {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20rpx;
    color: #808080;
  }
}
</style>
