<template>
  <view class="container van-safe-area-top van-safe-area-bottom" style="background-color: red">
    <!--    状态栏及导航栏盒子-->
    <statusBar bgColor="transparent"></statusBar>
    <!--        导航栏-->
    <NavBar shape fixed>
      <template #left>
        <view>
          <text>Cart</text>
          <sup v-if="store.cartNum">({{ store.cartNum }})</sup>
        </view>
      </template>
      <template #title>
        <view>
          <Search shape="round" :clearable="false" :style="{ height: navBarHeight + 'px' }" v-model="name" left-icon="" placeholder="请输入搜索内容" right-icon="search">
            <template #left-icon />
          </Search>
        </view>
      </template>
      <template #right>
        <Button size="small">Manage</Button>
      </template>
    </NavBar>

    <!--    内容-->
    <view class="container-body">
      <cartListPage ref="cartListPage"></cartListPage>
    </view>
    <TotalPayment isCheckBox @checkOut="checkAddress"></TotalPayment>
  </view>
</template>

<script setup>
import { NavBar, Search, Button } from 'vant';
import { showFailToast } from 'vant';
import { ref } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import TotalPayment from '@/subPackages/cart/TotalPayment.vue';
import { onTabItemTap } from '@dcloudio/uni-app';
import statusBar from '@/components/statusBar/statusBar.vue';
const name = ref('hello');
import cartListPage from '@/subPackages/cart/cartList.vue';
import { useCountStore } from '@/store/useCartTotalStore';

const store = useCountStore();

const { globalData } = getApp();

const { statusHeight, navBarHeight, tabBarHeight, statusHeightUnit } = useSystemInfo();
// 高度
const TBHeight = ref(tabBarHeight + 'px');
// 状态栏高度 + px
const SHHeight = ref(statusHeight + 'px');
// 状态栏 + 导航栏的高度
const SWNHeight = ref(statusHeight + navBarHeight + 'px');

// 底部导航栏切换重新请求
onTabItemTap(() => {
  store.getCartList();
});

const checkAddress = () => {
  if (store.checkboxValue.length === 0) {
    showFailToast('Please check product');
    return;
  }
  uni.navigateTo({
    url: '/subPackages/cart/confirmAddress',
  });
};
</script>

<style lang="scss">
:deep(.van-nav-bar--fixed) {
  top: v-bind(statusHeightUnit) !important;
}

.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - v-bind(TBHeight));
  /* #ifdef APP */
  height: calc(100vh);
  /* #endif */

  .container-body {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-content: space-between;
    background-color: #edeff6;
  }
}

:deep(.van-nav-bar__left) {
  padding: 0 16rpx;
  position: relative;
  font-size: large;
  font-weight: 500;
}

:deep(.van-nav-bar__right) {
  padding: 0 16rpx;
  position: relative;
}

:deep(.van-search) {
  padding: 6rpx 0;
}

:deep(.van-nav-bar__title) {
  flex: 1;
  max-width: 100%;
  margin: 0;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.w-30 {
  width: 30px;
}

.m-10 {
  margin-bottom: 10rpx;
}
</style>
