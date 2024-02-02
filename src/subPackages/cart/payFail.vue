<!--成功或失败-->
<template>
  <view class="container">
    <template v-if="payUrl">
      <!-- #ifdef H5 -->
      <iframe width="100%" height="100%" :src="payUrl" title="支付" />
      <!-- #endif -->
    </template>
    <template v-else>
      <!--    状态栏-->
      <status-bar></status-bar>
      <!--    导航栏-->
      <NavBar title="Payment Fail" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
      <view class="container-header">
        <view class="header-icon">
          <Icon name="close"></Icon>
        </view>
        <view class="header-text">payment failure!</view>
      </view>
      <view class="container-footer">
        <Button type="danger" round size="normal" class="footer-text" @click="againPay">Pay Again</Button>
        <Button type="danger" round size="normal" @click="goHome">Go Home</Button>
      </view>
    </template>
  </view>
</template>

<script setup>
import statusBar from '@/components/statusBar/statusBar.vue';
import { NavBar, Icon, Button } from 'vant';
import { paymentOrder } from '@/api/cart/payment';

import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

const payUrl = ref('');
onLoad((options) => {
  info.orderNumber = options.orderNumber;
});

// 重新支付
const againPay = async () => {
  // 支付
  const pRes = await paymentOrder(info);
  if (pRes) {
    payUrl.value = pRes.data;
  }
};

const info = reactive({
  orderNumber: '',
});

const onClickLeft = () => {
  uni.navigateTo({
    url: '/subPackages/cart/CheckOut',
  });
};

const goHome = () => {
  uni.switchTab({
    url: '/pages/share/index',
  });
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-header {
    height: 600rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header-icon {
      font-size: 160rpx;
      color: #ff4400;
      margin-bottom: 40rpx;
    }

    .header-text {
      color: #ff4400;
      font-size: 52rpx;
    }
  }

  .container-footer {
    padding: 0 80rpx;
    display: flex;
    justify-content: space-around;
  }
}
</style>
