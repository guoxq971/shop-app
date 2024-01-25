<template>
<<<<<<< HEAD
  <view class="container">
    <u-navbar bgColor="#F8F8F8" :height="navBarHeight">
      <template #left>
        <view class="navbar-left">Cart<sup>({{total}})</sup></view>
      </template>
      <template #center>
        <view>
          <u-input shape="circle" v-model="name" :customStyle="customStyle" placeholder="Search" suffixIcon="search" />
        </view>

      </template>
      <template #right>
        <u-button type="primary" :customStyle="customStyle" @click="name = '123'">Manage</u-button>
      </template>
    </u-navbar>
    <view  class="container-body">
      <view class="body-group">
        <u-checkbox-group
          v-model="checkboxValue1"
          placement="column"
          @change="checkboxChange"
        >
          <view v-for="(item, index) in checkboxList1" class="body-group">
            <view style="width: 30px;flex-shrink: 0">
              <u-checkbox
                :key="index"
                :name="item.name"
                :disabled="item.disabled"
                shape="circle"
              />
            </view>

            <view class="flex">
              <u-image :src="src" width="100px" height="100px" />
              <view class="group-right-box">
                <view class="flex m-10">
                  <u-text :lines="2" :text="item.title" />
                  <u-icon name="close" size="20" style="margin-left: 10rpx " />
                </view>
                <view class="m-10">{{item.color}},{{item.size}}</view>
                <view class="flex">
                  <view>
                    <sub>$</sub>
                    {{item.price}}
                  </view>
                 <view>{{item.saleNum}}</view>
                </view>
              </view>
            </view>
          </view>

        </u-checkbox-group>
      </view>
      <view>
        底部
      </view>

    </view>
=======
  <view>
    cart
>>>>>>> master
  </view>
</template>

<script setup>
<<<<<<< HEAD
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// import { useSystemInfo } from '@/store/useSystemInfo'
// import {storeToRefs} from 'pinia'
import {useSystemInfo} from '@/hooks/useSystemInfo'
import { randomImage, uuid } from '@/utils/commom';
import yf from '@/static/yf.jpg'
const name = ref('')
const total = ref(10)
const customStyle = reactive({
  height: '30px'
})
const src = ref(yf)
const pTop = ref(44)
const checkboxValue1 = reactive([]);

// const store = useSystemInfo()
// const { sInfo } = storeToRefs(store)
// console.log('sInfo', sInfo);
const { statusHeight,navBarHeight, tabBarHeight } = useSystemInfo()
console.log('statusHeight', statusHeight, navBarHeight);

// 高度
const TBHeight = ref(tabBarHeight + 'px')
// 状态栏 + 导航栏的高度
const SWNHeight = ref(statusHeight + navBarHeight + 'px')






// 基本案列数据
const checkboxList1 = reactive([
  {
    id: '1',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    disabled: false,
    url:randomImage()
  },
  {
    id: '2',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    disabled: false,
  },
  {
    id: '3',
    title: 'Michigan Wolverines Jordan Brand College Football Playoff 2023 NationalChampions Locker Room T-Shirt - Navy',
    price: '34.99',
    saleNum: '1',
    size: 'XL',
    color: 'Black',
    disabled: false,
  },
]);

const checkboxChange = (n) => {
  console.log('change', n);
};
=======
import { ref } from 'vue';
>>>>>>> master

</script>

<style lang="scss">
.container{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid red;
  height: calc(100vh - v-bind(TBHeight));
  padding-top: v-bind(SWNHeight + px);
  .navbar-left{
    font-weight: 700;
  }

  .container-body{
    flex: 1;
    display: flex;
    overflow: auto;
    border: 1px solid red;
    flex-direction: column;
    align-content: space-between;
    padding: 10rpx;
    background-color: #edeff6;

    .body-group{
      flex: 1;
      overflow: auto;

      .body-group{
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16rpx;
        border-radius: 8rpx;
        padding: 6rpx;

        .group-right-box{
          display: flex;
          flex-direction: column;
          align-content: space-between !important;
        }
      }
    }
  }

  // 小程序
  :deep(.u-navbar__content__left) {
    padding: 0 5rpx;
    position: relative;
  }
  :deep(.u-navbar__content__right) {
    padding: 0 5rpx;
    position: relative;
  }
}

// app或H5
:deep(.u-navbar__content__left) {
  padding: 0 5rpx;
  position: relative;
}
:deep(.u-navbar__content__right) {
  padding: 0 5rpx;
  position: relative;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.w-30{
  width: 30px;
}

.m-10{
  margin-bottom: 10rpx;
}
</style>
