<!--首页 - 分类 - 左侧弹窗-->
<template>
  <Popup v-model:show="show" position="left" @close="close" @open="open">
    <view>
      <view class="head-container-category-pop">
        <!--顶部搜索-->
        <view :style="style"></view>
        <view class="top-search-wrap">
          <view class="category" @click="close">
            <Icon name="arrow-left"></Icon>
            <text>Back</text>
          </view>
          <Search class="search" v-model="value" shape="square" :placeholder="placeholder" :showAction="false" searchIconColor="#222" :searchIconSize="26" />
        </view>
      </view>

      <!--列表-->
      <view class="list-wrap">
        <view class="item-wrap" v-for="item in list" :key="item.id">
          <view class="item-title">{{ item.label }}</view>
          <view class="item-list">
            <view v-for="item2 in item.list" :key="item2.id" class="box">
              <bmBox width="80%">
                <image class="image-wrap" :src="item2.url"></image>
              </bmBox>
              <view class="name">{{ item2.name }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script setup>
import { Popup, Icon, Search } from 'vant';
import { ref, defineExpose } from 'vue';
import { randomImage, uuid } from '@/utils/commom';
import bmBox from '@/components/bm/box/box.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
defineExpose({
  open,
  close,
});

const show = ref(false);
function open() {
  show.value = true;
}
function close() {
  show.value = false;
}

// 设备信息
const { statusHeight } = useSystemInfo();
const style = ref({
  width: '100%',
  height: statusHeight + 'px',
  background: '#fff',
});

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');

// 分类
const list = ref([
  {
    label: 'Sports',
    id: uuid(),
    list: [
      { id: uuid(), name: 'Baseball', url: randomImage() },
      { id: uuid(), name: 'Football', url: randomImage() },
      { id: uuid(), name: 'Basketball', url: randomImage() },
      { id: uuid(), name: 'Hockey', url: randomImage() },
      { id: uuid(), name: 'Soccer', url: randomImage() },
      { id: uuid(), name: 'Softball', url: randomImage() },
    ],
  },
  {
    label: 'Category',
    id: uuid(),
    list: [
      { id: uuid(), name: 'Sweatshirts', url: randomImage() },
      { id: uuid(), name: 'T-shirt', url: randomImage() },
      { id: uuid(), name: 'Polos', url: randomImage() },
      { id: uuid(), name: 'Jacket', url: randomImage() },
      { id: uuid(), name: 'Shorts', url: randomImage() },
      { id: uuid(), name: 'Pants', url: randomImage() },
      { id: uuid(), name: 'Hats', url: randomImage() },
    ],
  },
  {
    label: 'Category',
    id: uuid(),
    list: [
      { id: uuid(), name: 'Patriotic', url: randomImage() },
      { id: uuid(), name: 'supportive', url: randomImage() },
      { id: uuid(), name: 'specials', url: randomImage() },
    ],
  },
  {
    label: 'Category',
    id: uuid(),
    list: [
      { id: uuid(), name: 'Patriotic', url: randomImage() },
      { id: uuid(), name: 'supportive', url: randomImage() },
      { id: uuid(), name: 'specials', url: randomImage() },
    ],
  },
]);
</script>

<style scoped lang="scss">
.head-container-category-pop {
  //position: fixed;
  //top: 0;
  //z-index: 1;
  //width: 100%;
}

// 顶部搜索
$searchheight: 100rpx; // 搜索框高度
$searchPaddingTopBottom: 16rpx;
$searchPaddingLeftRight: 10rpx;
.top-search-wrap {
  background-color: #fff;
  width: 100%;
  height: $searchheight;
  padding: $searchPaddingTopBottom $searchPaddingLeftRight;
  display: flex;
  align-items: center;

  // 分类按钮
  .category {
    font-size: 26rpx;
    width: $searchheight;
    height: calc($searchheight - $searchPaddingTopBottom * 2);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    //border: 2rpx solid #f2f2f2;
    //background-color: #f2f2f2;
    border-radius: 4rpx;
    margin-right: 10rpx;
    font-weight: bold;
  }

  // 搜索
  .search {
    background: #f2f2f2;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

// 列表
.list-wrap {
  //  calc($searchheight + v-bind('style.height'))
  padding: 10rpx $searchPaddingLeftRight + 10rpx 0 $searchPaddingLeftRight + 10rpx;
  overflow: auto;
  height: calc(100vh - calc($searchheight + v-bind('style.height')));
  margin-bottom: 20rpx;

  .item-wrap {
    border-bottom: 2rpx solid #bbb;
    padding-bottom: 16rpx;
    margin-top: 24rpx;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }

    .item-title {
      font-size: 32rpx;
      margin-bottom: 20rpx;
    }

    .item-list {
      display: flex;
      flex-wrap: wrap;

      .box {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 28rpx;

        .image-wrap {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2rpx solid #f2f2f2;
        }

        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26rpx;
          margin-top: 12rpx;
        }
      }
    }
  }
}
</style>
