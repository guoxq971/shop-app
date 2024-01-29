<template>
  <view class="container">
    <!--    导航栏-->
    <view class="header-bar">
      <NavBar fixed shape class="nav-bar">
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
    </view>

    <!--    内容-->
    <view class="container-body">
      <view class="body-group">
        <CheckboxGroup v-model="checkboxValue">
          <view v-for="(item, index) in checkboxList" class="body-group-item">
            <view style="width: 30px; flex-shrink: 0">
              <Checkbox :key="index" :name="item.id" />
            </view>

            <view class="flex group-right">
              <VanImage :src="item.url" width="100px" radius="4" height="100px" />
              <view class="group-right-box">
                <view class="m-10 right-box-title">
                  <text class="title-text">{{ item.title }}</text>
                  <view @click="tapDel(item)">
                    <Icon name="cross"></Icon>
                  </view>
                </view>
                <view class="m-10 right-box-size">
                  <text>{{ item.color }},{{ item.size }}</text>
                  <Icon name="arrow-down" style="margin-left: 20rpx; font-weight: bold"></Icon>
                </view>
                <!--                <view class="m-10">-->
                <!--                  <Tag  plain type="primary">标签</Tag>-->
                <!--                </view>-->
                <view class="box-price">
                  <view style="display: flex; align-items: center">
                    <sub>$</sub>
                    <text style="margin-left: 6rpx">{{ item.price }}</text>
                  </view>
                  <Tag plain size="medium" style="padding: 10rpx">x {{ item.saleNum }}</Tag>
                </view>
              </view>
            </view>
          </view>
        </CheckboxGroup>
      </view>
      <TotalPayment isCheckBox @changeAll="changeAll" @checkOut="checkAddress"></TotalPayment>
    </view>
  </view>
</template>

<script setup>
import { NavBar, Search, Button, Checkbox, CheckboxGroup, Image as VanImage, Tag, Icon } from 'vant';
import { ref, reactive } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { randomImage } from '@/utils/commom';
import TotalPayment from '@/subPackages/cart/TotalPayment.vue';
const name = ref('hello');

const checkboxValue = ref([]);
const { statusHeight, navBarHeight, tabBarHeight } = useSystemInfo();

const checkAll = ref(false);

// 高度
const TBHeight = ref(tabBarHeight + 'px');
// 状态栏高度 + px
const SHHeight = ref(statusHeight + 'px');
// 状态栏 + 导航栏的高度
const SWNHeight = ref(statusHeight + navBarHeight + 'px');

// 基本案列数据
let checkboxList = reactive([
  {
    id: '1',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    disabled: false,
    url: randomImage(),
  },
  {
    id: '2',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    url: randomImage(),
  },
  {
    id: '3',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    url: randomImage(),
  },
  {
    id: '4',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    url: randomImage(),
  },
  {
    id: '5',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    url: randomImage(),
  },
  {
    id: '6',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    url: randomImage(),
  },
]);

const tapDel = (item) => {
  const len = checkboxList.findIndex((box) => item.id === box.id);
  checkboxList.splice(len, 1);
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
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - v-bind(TBHeight));
  /* #ifdef APP */
  height: calc(100vh);
  /* #endif */

  .header-bar {
    height: v-bind(SWNHeight);
  }

  .container-body {
    flex: 1;
    display: flex;
    overflow: auto;
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
          align-content: space-between !important;

          .box-price {
            display: flex;
            align-content: center;
            justify-content: space-between;
          }
        }
      }
    }

    .body-footer {
      margin-top: 2rpx;
      padding: 10rpx;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-content: center;
      box-sizing: border-box;
      border-top: 2rpx solid #a1a2a4;

      .footer-total {
        display: flex;
        flex-direction: column;
        text-align: right;
        height: 100%;
        justify-content: space-between;
        margin-right: 10rpx;
      }
    }
  }
}

.nav-bar {
  padding-top: v-bind(SHHeight);
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
