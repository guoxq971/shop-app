<!--首页-->
<template>
  <view class="share-layout" :style="style">
    <!--顶部搜索-->
    <view class="top-search-wrap">
      <view class="category">分类</view>
      <u-search class="search" v-model="value" shape="square" :placeholder="placeholder" :showAction="false" searchIconColor="#222" :searchIconSize="26" />
    </view>

    <!--广告-->
    <view class="advertised" style="height: 100rpx">
      广告1
      <view>状态栏高度{{ statusHeight }}</view>
    </view>

    <!--分类-->
    <view class="category-wrap">
      <view class="title">Shop Your Favorite League</view>
      <view class="list">
        <view class="item-container" v-for="item in categoryList" :key="item.id">
          <view class="item-head"></view>
          <view class="item-name">{{ item.name }}</view>
        </view>
      </view>
    </view>

    <!--广告-->
    <view class="advertised" style="height: 700rpx">广告2</view>

    <!--热门商品-->
    <view class="hot-commodity-wrap">
      <view class="title">
        <view class="title-left">On Sales</view>
        <view class="title-right">VIEW ALL</view>
      </view>
      <view class="list">
        <view class="item" v-for="item in hotList" :key="item.id">
          <view class="image-wrap">
            <image :src="item.url"></image>
          </view>
          <view class="now-price">现价格</view>
          <view class="org-price">原价格</view>
          <view class="diff-num">差值</view>
          <view class="title">标题</view>
          <view class="label-wrap">
            <view>Most Popular</view>
            <view>Jersey Assurance</view>
          </view>
        </view>
      </view>
    </view>

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
import { randomImage, uuid } from '@/utils/commom';
import { useSystemInfo } from '@/hooks/useSystemInfo';

// 设备信息
const { statusHeight } = useSystemInfo();
const style = {
  paddingTop: statusHeight + 'px',
};

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');

// 分类
const categoryList = ref([
  { id: uuid(), name: 'NFL' },
  { id: uuid(), name: 'NCAA' },
  { id: uuid(), name: 'MLB' },
  { id: uuid(), name: 'NBA' },
  { id: uuid(), name: 'NHL' },
  { id: uuid(), name: 'MLS' },
  { id: uuid(), name: 'Soccer' },
  { id: uuid(), name: 'NASCAR' },
  { id: uuid(), name: 'WWE' },
  { id: uuid(), name: 'WNBA' },
  { id: uuid(), name: 'Golf' },
  { id: uuid(), name: 'F1' },
]);

// 热门商品
const hotList = ref([
  { id: uuid(), name: 'NFL', url: randomImage() },
  { id: uuid(), name: 'NCAA', url: randomImage() },
  { id: uuid(), name: 'MLB', url: randomImage() },
  { id: uuid(), name: 'NBA', url: randomImage() },
  { id: uuid(), name: 'NHL', url: randomImage() },
]);
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
      border: 2rpx solid #f2f2f2;
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
    margin-top: 10rpx;
    background: #f2f2f2;
    border-top: 1rpx solid #bbb;
    border-bottom: 1rpx solid #bbb;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }

  // 分类
  .category-wrap {
    padding: 0 70rpx;

    .title {
      margin: 18rpx 0;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 34rpx;
      font-family: 'monica-ext-font_YIBBBFG', serif;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .item-container {
        margin-bottom: 50rpx;
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item-head {
          border: 2rpx solid #bbb;
          border-radius: 50%;
          width: 100rpx;
          height: 100rpx;
        }
        .item-name {
          font-size: 24rpx;
        }
      }
    }
  }

  // 热门商品
  .hot-commodity-wrap {
    padding: 0 24rpx;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 0;
      font-weight: bold;
      margin-bottom: 16rpx;
      .title-left {
      }
      .title-right {
        text-decoration: underline;
      }
    }
    .list {
      display: flex;
      overflow: auto;
      .item {
        .image-wrap {
        }
        .now-price {
        }
        .org-price {
        }
        .diff-num {
        }
        .title {
        }
        .label-wrap {
        }
      }
    }
  }
}
</style>
