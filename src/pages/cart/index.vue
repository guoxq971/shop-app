<template>
  <view class="container van-safe-area-bottom">
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar shape fixed>
      <template #left>
        <view>
          <text>Cart</text>
          <sup v-if="checkboxList.length">({{ checkboxList.length }})</sup>
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
      <view class="body-group">
        <CheckboxGroup v-model="checkboxValue">
          <view v-for="(item, index) in checkboxList" class="body-group-item">
            <view style="width: 30px; flex-shrink: 0">
              <Checkbox :key="index" :name="item.id" />
            </view>

            <view class="group-right">
              <VanImage :src="globalData.prefixImg + item.pic" width="100px" radius="4" height="100px" />
              <view class="group-right-box">
                <view class="m-10 right-box-title">
                  <text class="title-text">{{ item.prodName }}</text>
                  <view @click="tapDel(item)">
                    <Icon name="cross"></Icon>
                  </view>
                </view>
                <view class="m-10 right-box-size">
                  <text>{{ item.productSpec }}</text>
                  <Icon name="arrow-down" style="margin-left: 20rpx; font-weight: bold"></Icon>
                </view>
                <!--                <view class="m-10">-->
                <!--                  <Tag  plain type="primary">标签</Tag>-->
                <!--                </view>-->
                <view class="box-price">
                  <view style="display: flex; align-items: center">
                    <sub>$</sub>
                    <text>{{ item.price }}</text>
                  </view>
                  <Stepper v-model="item.basketCount" button-size="22" @change="changeCount(item)"></Stepper>
                </view>
              </view>
            </view>
          </view>
        </CheckboxGroup>
      </view>
    </view>
    <TotalPayment isCheckBox @changeAll="changeAll" @checkOut="checkAddress"></TotalPayment>
  </view>
</template>

<script setup>
import { NavBar, Search, Button, Checkbox, CheckboxGroup, Image as VanImage, Tag, Icon, Stepper } from 'vant';
import { ref, reactive, onMounted } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import TotalPayment from '@/subPackages/cart/TotalPayment.vue';
import { cartList, updateItem, deleteItem, prodCount } from '@/api/cart/cart';
import { onTabItemTap } from '@dcloudio/uni-app';
import statusBar from '@/components/statusBar/statusBar.vue';
const name = ref('hello');

const { globalData } = getApp();

const checkboxValue = ref([]);
const { statusHeight, navBarHeight, tabBarHeight, statusHeightUnit } = useSystemInfo();
// 高度
const TBHeight = ref(tabBarHeight + 'px');
// 状态栏高度 + px
const SHHeight = ref(statusHeight + 'px');
// 状态栏 + 导航栏的高度
const SWNHeight = ref(statusHeight + navBarHeight + 'px');

const cartCount = ref(0);
const getCartCount = async () => {
  const { data } = await prodCount();
};

const getCartList = async () => {
  const { data } = await cartList();
  checkboxList.value = data;
};

// 底部导航栏切换重新请求
onTabItemTap(() => {
  getCartCount();
  getCartList();
});

// 数据列表
let checkboxList = ref([]);

// 删除
const tapDel = async (item) => {
  const res = await deleteItem([item.basketId]);
  if (res) {
    await getCartList();
    await getCartCount();
  }
};

const changeAll = (val) => {
  if (val) {
    checkboxValue.value = checkboxList.map((item) => item.id);
  } else {
    checkboxValue.value = [];
  }
};

const checkAddress = () => {
  uni.navigateTo({
    url: '/subPackages/cart/confirmAddress',
  });
};

// 修改数量
let timer = null;
const changeCount = (item) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    const obj = {
      basketId: item.basketId, // 购物车id
      count: item.basketCount,
      prodId: item.prodId, // 产品Id
      skuId: item.skuId,
    };
    updateItem(obj);
    getCartCount();
  }, 300);
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

    .body-group {
      padding: 10rpx 10rpx 0;
      flex: 1;
      overflow: auto;

      .body-group-item {
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16rpx;
        border-radius: 8rpx;
        padding: 6rpx;

        .group-right {
          display: flex;
          padding-left: 6rpx;
          flex: 1;
          padding-right: 6rpx;

          .right-box-title {
            display: flex;

            .title-text {
              font-size: 28rpx;
              flex: 1;
              -webkit-line-clamp: 3;
              overflow: hidden;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              font-weight: bold;
            }
          }

          .right-box-size {
            font-size: 28rpx;
          }
        }

        .group-right-box {
          padding-left: 16rpx;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .box-price {
            display: flex;
            align-content: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
}

:deep(.van-nav-bar__left) {
  padding: 0 16rpx;
  position: relative;
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
