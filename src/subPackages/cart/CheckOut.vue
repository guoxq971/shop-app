<template>
  <view class="container">
    <!--    状态栏及导航栏盒子-->
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar title="Confirm the Order" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
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
import { ref, onMounted } from 'vue';
import TotalPayment from './TotalPayment.vue';
import { randomTool, randomInt } from '@/utils/commom';
import productBox from './components/productBox.vue';
import { useOrderExpress } from '@/store/useOrderExpress';
import { useCountStore } from '@/store/useCartTotalStore';
import { storeToRefs } from 'pinia';
import statusBar from '@/components/statusBar/statusBar.vue';
import { orderInfo, createOrder, paymentOrder } from '@/api/cart/payment';

const checkOut = async () => {
  // 创建订单
  const res = await createOrder({});
  if (res) {
    // 支付
    const pRes = await paymentOrder({});
    if (pRes) {
      uni.navigateTo({
        // url: '/subPackages/cart/paySuccess',
        url: '/subPackages/cart/payFail',
      });
    }
  }
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

const { expressInfo } = storeToRefs(useOrderExpress());
const { checkboxValue } = storeToRefs(useCountStore());
console.log('checkboxValue', checkboxValue.value);
const getOrderInfo = async () => {
  const obj = {
    addressId: expressInfo.value.addressId, // 地址id
    basketIdList: checkboxValue.value, // 地址id
    remark: expressInfo.value.remark, // 地址id
    expressId: expressInfo.value.expressId, // 快递id
    transfeeId: expressInfo.value.transfeeId, // 快递运费id
  };
  const res = await orderInfo(obj);
  console.log('res', res);
};

onMounted(() => {
  getOrderInfo();
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
