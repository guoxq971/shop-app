<!--单个订单盒子-->
<template>
  <view class="box">
    <view class="box-header">
      <view class="header-number">{{ info.orderNumber }}</view>
      <Tag :type="tagType" size="medium">{{ info.statusName }}</Tag>
    </view>
    <slot></slot>
    <view class="box-price">
      <view class="price-item">
        Pay:
        <Price :price="info.prodCountTotal"></Price>
      </view>
    </view>
    <view class="box-operate">
      <view>
        <Button v-if="[4].includes(info.status)" type="primary" size="small" class="m-r10">再买一单</Button>
        <Button v-if="[3].includes(info.status)" type="success" size="small" class="m-r10">确认收货</Button>
        <Button v-if="[1].includes(info.status)" type="danger" size="small" class="m-r10">取消</Button>
        <Button v-if="[4, -1].includes(info.status)" type="danger" size="small" class="m-r10">删除</Button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { Button, Tag } from 'vant';
import Price from '@/components/price';
import { computed } from 'vue';

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const tagType = computed(() => {
  let state = '';
  if ([1].includes(props.info.status)) state = 'danger';
  if ([2, 3].includes(props.info.status)) state = 'success';
  if ([4].includes(props.info.status)) state = 'primary';
  return state;
});
</script>

<style scoped lang="scss">
.box {
  padding: 16rpx;
  background-color: #fbfbfb;
  margin-bottom: 16rpx;
  border-radius: 8rpx;

  .box-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;

    .header-number {
      font-weight: bold;
    }
  }

  .box-price {
    display: flex;
    justify-content: flex-end;
    margin: 16rpx 0;
    font-weight: 600;

    .price-item {
      display: flex;
    }
  }

  .box-operate {
    display: flex;
    justify-content: flex-end;
  }
}
.m-r10 {
  margin-right: 10rpx;
}
</style>
