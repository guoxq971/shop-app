<!--商品信息-->
<template>
  <view class="info-box">
    <!--    <VanImage :src="globalData.prefixImg + info.pic" class="box-image"></VanImage>-->
    <VanImage :src="$basePathImg + info.pic" class="box-image" width="200rpx" height="200rpx" radius="8rpx"></VanImage>
    <view class="box-right">
      <view class="right-title">
        <view class="title-name">{{ info.productName }}</view>
        <view>
          <slot name="title-right"></slot>
        </view>
      </view>
      <view class="right-size">{{ info.productSpec }}</view>
      <view class="right-price">
        <view class="price-num">
          <sub style="margin-right: 4rpx">$</sub>
          <view class="price-num">{{ info.price }}</view>
        </view>
        <view>
          <slot name="price-right">x {{ info.basketCount }}</slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { Image as VanImage } from 'vant';
defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss">
.info-box {
  padding: 16rpx;
  display: flex;
  background-color: #ffffff;
  margin-bottom: 12rpx;
  width: 100%;

  .box-image {
    width: 200rpx;
    height: 200rpx;
    flex-shrink: 0;
    border-radius: 8rpx;
    margin-right: 12rpx;
  }

  .box-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .right-title {
      display: flex;
      justify-content: space-between;

      .title-name {
        flex: 1;
        font-size: 28rpx;
        -webkit-line-clamp: 3;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        font-weight: bold;
      }
    }

    .right-size {
      font-size: 28rpx;
    }

    .right-price {
      display: flex;
      justify-content: space-between;

      .price-num {
        display: flex;
        align-items: baseline;
        color: #ff4400;
      }
    }
  }
}
</style>
