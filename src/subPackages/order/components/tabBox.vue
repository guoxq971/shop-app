<template>
  <view class="box" :style="{ padding: list.length === 0 ? '0' : '16rpx' }">
    <template v-if="!loading && list.length === 0">
      <Empty description="暂无订单" style="height: 100%; background-color: #ffffff"></Empty>
    </template>

    <template v-else>
      <OrderBox v-for="(item, index) in list" :key="index" :info="item">
        <ProductBox v-for="(detail, i) in item.orderItemVoList" :key="i" :info="detail"></ProductBox>
      </OrderBox>
      <Button v-if="isMore" block @click="loadMore">Loading More</Button>
    </template>
  </view>
</template>

<script setup>
import ProductBox from '@/subPackages/cart/components/productBox.vue';
import OrderBox from './orderBox.vue';
import { Button, Empty } from 'vant';
defineProps({
  list: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // 是否需要加载更多按钮
  isMore: {
    type: Boolean,
    default: true,
  },
  // 是否加载中
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['loadMore']);

const loadMore = () => {
  emit('loadMore');
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
