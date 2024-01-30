<template>
  <view class="container">
    <!--    状态栏-->
    <view :style="{ height: statusHeight + 'px' }" />
    <!--    导航栏-->
    <NavBar title="Confirm the Order" left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <view class="body-info">
        <view v-for="item in list" :key="item.uuid" class="info-box">
          <image :src="item.image" class="box-image"></image>
          <view class="box-right">
            <view class="right-title">{{ item.name }}</view>
            <view class="right-size">Black - XL</view>
            <view class="right-price">
              <view class="price-num">
                <sub style="margin-right: 4rpx">$</sub>
                <view class="price-num">{{ item.price }}</view>
              </view>
              <view>x {{ item.count }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="body-button">
        <Button :type="payWay === 'PayPal' ? 'primary' : 'default'" size="small" @click="changeWay('PayPal')" class="m-r12">PayPal</Button>
        <Button :type="payWay === 'Apple' ? 'primary' : 'default'" @click="changeWay('Apple')" size="small">Apple Pay</Button>
      </view>
    </view>
    <TotalPayment @checkOut="checkOut"></TotalPayment>
  </view>
</template>

<script setup>
import { NavBar, Button } from 'vant';
import { ref } from 'vue';
import TotalPayment from './TotalPayment.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { randomTool, randomInt } from '@/utils/commom';

const { statusHeight } = useSystemInfo();

const checkOut = () => {
  uni.navigateTo({
    url: '/subPackages/cart/checkout',
  });
};

const payWay = ref('PayPal');

const onClickLeft = () => {
  uni.navigateTo({
    url: '/subPackages/cart/confirmAddress',
  });
};

const changeWay = (type) => {
  payWay.value = type;
};

const list = Array.from({ length: 10 }, () => {
  return {
    id: randomTool.uuid(),
    name: randomTool.title(),
    price: randomTool.price(),
    image: randomTool.image(),
    count: randomInt(1, 20),
  };
});
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-body {
    padding: 16rpx;
    flex: 1;
    overflow: hidden;
    background-color: #edeff6;
    display: flex;
    flex-direction: column;

    .body-info {
      margin-bottom: 16rpx;
      border-radius: 8rpx;
      flex: 1;
      overflow: auto;

      .info-box {
        padding: 16rpx;
        display: flex;
        background-color: #ffffff;
        margin-bottom: 12rpx;

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

          .right-title {
            font-size: 28rpx;
            -webkit-line-clamp: 3;
            overflow: hidden;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            font-weight: bold;
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
            }
          }
        }
      }
    }

    .body-button {
      padding: 10rpx;
      background-color: #ffffff;
    }
  }
}

.m-r12 {
  margin-right: 12rpx;
}
</style>
