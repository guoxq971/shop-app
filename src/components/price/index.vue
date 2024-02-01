<template>
  <view class="price">
    <sub class="price-unit">{{ unit }}</sub>
    <view>{{ price }}</view>
  </view>
</template>

<script setup>
defineProps({
  price: {
    type: [String, Number],
    default: '',
  },
  unit: {
    type: String,
    default: '$',
  },
  color: {
    type: String,
    default: '#ff4400',
  },
});
</script>

<style scoped lang="scss">
.price {
  display: flex;
  align-items: baseline;
  color: v-bind(color);

  .price-unit {
    margin-right: 4rpx;
  }
}
</style>
