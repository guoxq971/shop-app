<template>
  <view class="userinfo-container van-safe-area-top van-safe-area-bottom">
    <!-- 头像区域 -->
    <view class="top-box">
      <image class="acator" :src="userinfo.avatarUrl"></image>
      <view class="nickname">{{ userinfo.nickName }}</view>
    </view>
    <!-- 面板 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <!--      <view class="panel">-->
      <!--        <view class="panel-body">-->
      <!--          <view class="panel-item">-->
      <!--            <text>8</text>-->
      <!--            <text>收藏的店铺</text>-->
      <!--          </view>-->
      <!--          <view class="panel-item">-->
      <!--            <text>14</text>-->
      <!--            <text>收藏的商品</text>-->
      <!--          </view>-->
      <!--          <view class="panel-item">-->
      <!--            <text>18</text>-->
      <!--            <text>关注的商品</text>-->
      <!--          </view>-->
      <!--          <view class="panel-item">-->
      <!--            <text>80</text>-->
      <!--            <text>足迹</text>-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <view class="panel-item" @click="goOrderPage('1')">
            <VanImage src="../../static/my-icons/icon3.png" class="icon"></VanImage>
            <text>待支付</text>
          </view>
          <view class="panel-item" @click="goOrderPage('2')">
            <VanImage src="../../static/my-icons/icon2.png" class="icon"></VanImage>
            <text>待发货</text>
          </view>
          <view class="panel-item" @click="goOrderPage('3')">
            <VanImage src="../../static/my-icons/icon1.png" class="icon"></VanImage>
            <text>待收货</text>
          </view>
          <view class="panel-item" @click="goOrderPage('4')">
            <VanImage src="../../static/my-icons/icon4.png" class="icon"></VanImage>
            <text>已完成</text>
          </view>
          <view class="panel-item" @click="goOrderPage('-1')">
            <VanImage src="../../static/my-icons/icon1.png" class="icon"></VanImage>
            <text>已取消</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <!--      <view class="panel">-->
      <!--        <view class="panel-list-item">-->
      <!--          <text>收货地址</text>-->
      <!--          <uni-icons type="arrowright" size="15"></uni-icons>-->
      <!--        </view>-->
      <!--        <view class="panel-list-item">-->
      <!--          <text>联系客服</text>-->
      <!--          <uni-icons type="arrowright" size="15"></uni-icons>-->
      <!--        </view>-->
      <!--        <view class="panel-list-item" @click="logout">-->
      <!--          <text>退出登录</text>-->
      <!--          <uni-icons type="arrowright" size="15"></uni-icons>-->
      <!--        </view>-->
      <!--      </view>-->
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Icon, Image as VanImage } from 'vant';
import { randomTool } from '@/utils/commom';
import { useSystemInfo } from '@/hooks/useSystemInfo';

const { tabBarHeightUnit } = useSystemInfo();

const userinfo = reactive({
  avatarUrl: randomTool.image(),
  nickName: randomTool.word(),
});

const goOrderPage = (status) => {
  uni.navigateTo({
    // url: `/subPackages/share/productDetail/productDetail?id`,
    url: `subPackages/order/orderListPage`,
  });
  // uni.navigateTo({
  //   // url: `/subPackages/myOrder/orderListPage?status=${status}`,
  //   url: '/subPackages/order/orderListPage',
  //   // url: '/subPackages/cart/CheckOut',
  // });
};
</script>

<style scoped lang="scss">
.userinfo-container {
  overflow: hidden;
  height: calc(100vh - v-bind(tabBarHeightUnit));
  /* #ifdef APP */
  height: calc(100vh);
  /* #endif */
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .acator {
      height: 90px;
      width: 90px;
      border-radius: 45px;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      font-size: 16px;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  .panel-list {
    padding: 0 10px;
    position: relative;
    margin-top: -10px;

    .panel {
      background-color: white;
      border-radius: 3px;
      margin-bottom: 8px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }

      .panel-list-item {
        display: flex;
        line-height: 45px;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
        line-height: 45px;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          font-size: 13px;

          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
