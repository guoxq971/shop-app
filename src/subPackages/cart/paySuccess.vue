<!--成功-->
<template>
  <view class="container">
    <!--    状态栏-->
    <status-bar bgColor="#0497ff"></status-bar>
    <!--    导航栏-->
    <NavBar title="Payment Success" :border="false" class="nav-bar" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-header">
      <view class="header-icon">
        <Icon name="success"></Icon>
      </view>
      <view class="header-text">Payment Success!</view>
    </view>
    <view class="container-body">
      <view class="order-info" style="margin-top: 30rpx">
        <text class="info-name">Order No:</text>
        <text>{{ info.orderNumber }}</text>
      </view>
      <!--      <view class="body-total">-->
      <!--        <sub>$</sub>-->
      <!--        <text>155.21</text>-->
      <!--      </view>-->
      <!--      <view class="body-order">-->
      <!--        <view class="order-info">-->
      <!--          <text class="info-name">Order No:</text>-->
      <!--          <text>{{ info.orderNumber }}</text>-->
      <!--        </view>-->
      <!--        <view class="order-info">-->
      <!--          <text class="info-name">Time:</text>-->
      <!--          <text>2021-09-21 12:34:56</text>-->
      <!--        </view>-->
      <!--        <view class="order-info">-->
      <!--          <text class="info-name">Payment Method:</text>-->
      <!--          <text>WeChat</text>-->
      <!--        </view>-->
      <!--        <view class="order-info">-->
      <!--          <text class="info-name">Payment Status:</text>-->
      <!--          <text>Success</text>-->
      <!--        </view>-->
      <!--      </view>-->
    </view>

    <view class="container-footer">
      <Button type="primary" round size="normal" class="footer-text">check an order</Button>
      <Button type="primary" round size="normal" @click="goHome">Go Home</Button>
    </view>
  </view>
</template>

<script setup>
import statusBar from '@/components/statusBar/statusBar.vue';
import { NavBar, Icon, Button } from 'vant';
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from 'vue';

onLoad((options) => {
  info.orderNumber = options.orderNumber;
});

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

  .nav-bar {
    background-color: #0497ff;
    border-bottom-color: #0497ff;
  }

  .container-header {
    height: 400rpx;
    display: flex;
    justify-content: center;
    background-color: #0497ff;
    align-items: center;
    color: #ffffff;

    .header-icon {
      font-size: 60rpx;
      background-color: #fff;
      color: #0497ff;
      border-radius: 50%;
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
    }
  }

  .container-body {
    position: relative;
    padding: 20rpx 40rpx;

    .body-total {
      background-color: #ffffff;
      position: absolute;
      top: -60rpx;
      left: 40rpx;
      right: 40rpx;
      box-shadow: 0 0 20rpx 20rpx rgba(0, 0, 0, 0.1);
      font-size: 36rpx;
      padding: 40rpx 0;
      display: flex;
      align-items: baseline;
      justify-content: center;
      border-radius: 8rpx;
    }

    .body-order {
      margin-top: 46rpx;
      box-shadow: 0 0 20rpx 20rpx rgba(0, 0, 0, 0.1);
      border-radius: 8rpx;
      padding: 20rpx;

      .order-info {
        margin-bottom: 24rpx;
        font-size: 28rpx;

        .info-name {
          display: inline-block;
          color: #969799;
          width: 240rpx;
        }
      }
    }
  }

  .container-footer {
    padding: 0 80rpx;
    margin-top: 200rpx;
    display: flex;
    justify-content: space-around;
  }
}

:deep(.van-nav-bar__text) {
  color: #ffffff;
}
:deep(.van-nav-bar .van-icon) {
  color: #ffffff;
}

:deep(.van-nav-bar__title) {
  color: #ffffff;
}
</style>
