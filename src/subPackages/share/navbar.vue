<template>
  <view class="head-container">
    <view :style="statusBarStyle"></view>
    <!--顶部搜索-->
    <view class="top-search-wrap">
      <view class="category" @click="onCategory">分类</view>
      <Search class="search" v-model="value" shape="square" :placeholder="placeholder" :clearable="false" />
    </view>

    <teleport to="body">
      <!--分类弹窗-->
      <categoryPop ref="categoryPopRef" />
    </teleport>
  </view>
</template>

<script setup>
import { Search } from 'vant';
import categoryPop from '@/subPackages/share/categoryPop.vue';
import { ref } from 'vue';
import { useShareConfig } from '@/hooks/useShareConfig';
const { searchHeight, searchPaddingLeftRight, statusBarStyle } = useShareConfig();

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');

// 分类
const categoryPopRef = ref(null);
function onCategory() {
  categoryPopRef.value.open();
}
</script>

<style scoped lang="scss">
$searchPaddingTopBottom: 16rpx;
$searchheight: v-bind(searchHeight);
$searchPaddingLeftRight: v-bind(searchPaddingLeftRight);
.head-container {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  // 顶部搜索
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
      justify-content: center;
      align-items: center;
      border: 2rpx solid #f2f2f2;
      background-color: #f2f2f2;
      border-radius: 4rpx;
      margin-right: 10rpx;
    }

    // 搜索
    .search {
      //background: #f2f2f2;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    :deep(.van-search) {
      padding: 0;
    }
    :deep(.van-search__content) {
      height: 100%;
    }
  }
}
</style>
