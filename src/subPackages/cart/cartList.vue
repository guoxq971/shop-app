<!--购物车商品列表-->
<template>
  <view class="body-group">
    <CheckboxGroup v-model="store.checkboxValue" @change="changeVal">
      <view v-for="(item, index) in store.list" class="body-group-item">
        <view style="width: 30px; flex-shrink: 0">
          <Checkbox :key="index" :name="item.basketId" />
        </view>

        <view class="group-right">
          <VanImage :src="$basePathImg + item.pic" width="100px" radius="4" height="100px" />
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
</template>

<script setup>
import { Checkbox, CheckboxGroup, Image as VanImage, Tag, Icon, Stepper } from 'vant';
import { onMounted } from 'vue';
import { useCountStore } from '@/store/useCartTotalStore';

const store = useCountStore();

// 删除
const tapDel = (item) => {
  store.delCart([item.basketId]);
};

onMounted(() => {
  store.getCartList();
});

// 修改数量
let timer = null;
const changeCount = (item) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    store.updateCart(item);
  }, 300);
};

const changeVal = () => {
  store.getCartPrice();
};
</script>

<style scoped lang="scss">
:deep(van-checkbox-group) {
  overflow: auto;
}
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
</style>
