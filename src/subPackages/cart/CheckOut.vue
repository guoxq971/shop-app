<template>
  <view class="container">
    <!--    状态栏-->
    <view :style="{ height: statusHeight + 'px' }" />
    <!--    导航栏-->
    <NavBar title="Confirm the Order" left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <view class="body-info">
        <productBox v-for="item in list" :key="item.uuid" :info="item"></productBox>
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
import productBox from './components/productBox.vue';

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
