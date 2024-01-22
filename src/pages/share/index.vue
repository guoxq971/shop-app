<!--首页-->
<template>
  <view class="share-layout">
    <!--顶部搜索-->
    <view class="top-search-wrap">
      <view class="category">分类</view>
      <u-search class="search" v-model="value" shape="square" :placeholder="placeholder" :showAction="false" searchIconColor="#222" :searchIconSize="26" />
    </view>

    <!--广告-->
    <view class="advertised">广告1</view>

    <!--分类-->
    <view>分类</view>

    <!--广告-->
    <view>广告2</view>

    <!--热门商品-->
    <view>热门商品 on sales</view>

    <!--广告-->
    <view>广告3</view>

    <!--分类2-->
    <view>分类2</view>

    <!--广告-->
    <view>广告4</view>
    <view>广告5</view>
    <view>广告6</view>
    <view>广告7</view>
    <view>广告8</view>

    <!--评论-->
    <view>评论 Reviews</view>

    <!--底部 = 注册 & logo & 版权-->
    <view>底部 = 注册 & logo & 版权</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import uSearch from 'uview-plus/components/u-search/u-search.vue';

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');
</script>

<style lang="scss">
.share-layout {
  // 顶部搜索
  $searchheight: 90rpx;
  $searchPaddingTopBottom: 10rpx;
  .top-search-wrap {
    width: 100%;
    height: $searchheight;
    padding: $searchPaddingTopBottom 10rpx;
    display: flex;
    align-items: center;

    // 分类
    .category {
      font-size: 26rpx;
      width: $searchheight;
      height: calc($searchheight - $searchPaddingTopBottom * 2 - 2rpx);
      display: flex;
      justify-content: center;
      align-items: center;
      //border: 1rpx solid #f2f2f2;
      background-color: #f2f2f2;
      border-radius: 4rpx;
      margin-right: 10rpx;
    }

    // 搜索
    .search {
      height: 100%;
      :deep(.u-search__content) {
        border-radius: 2px !important;
      }
    }
  }

  // 广告
  .advertised {
    background: #f2f2f2;
    border-top: 1rpx solid #bbb;
    border-bottom: 1rpx solid #bbb;
    padding: 20rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }
}
</style>
