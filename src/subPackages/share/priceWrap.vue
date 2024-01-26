<!--价格-->
<template>
  <view class="price-wrap">
    <text class="text-left" v-if="$slots['left']"><slot name="left"></slot></text>
    <view class="unit">{{ unit }}</view>
    <view class="price">{{ price }}</view>
    <view class="decimals">{{ decimals }}</view>
    <text class="text" v-if="$slots['right']"><slot name="right"></slot></text>
    <view v-if="isDel" class="line-through"></view>
  </view>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  value: { type: [Number, String], default: () => {} },
  color: { type: String, default: '#d52c1c' },
  unit: { type: String, default: '$' },
  isDel: { type: Boolean, default: false },
});

const price = computed(() => {
  return props.value.toString().split('.')[0];
});
const decimals = computed(() => {
  return props.value.toString().split('.')[1];
});
</script>

<style scoped lang="scss">
.price-wrap {
  font-weight: 400;
  color: v-bind('props.color');
  font-size: 40rpx !important;
  position: relative;
  width: fit-content;
  display: flex;
  letter-spacing: 0.6rpx;

  .line-through {
    background: v-bind('props.color');
    width: 100%;
    height: 4rpx;
    position: absolute;
    top: 50%;
  }

  .unit {
    font-size: 22rpx !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    vertical-align: text-top;
    height: 100%;
    position: relative;
    top: 2rpx;
    font-weight: 400;
  }
  .price {
    padding: 0 1px;
  }
  .decimals {
    font-size: 22rpx !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    vertical-align: text-top;
    height: 100%;
    position: relative;
    top: 2rpx;
    font-weight: 400;
    margin-right: 10rpx;
  }
  .text {
    font-weight: 300;
    font-size: 34rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .text-left {
    font-weight: 300;
    font-size: 34rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-right: 10rpx;
  }
}
</style>
