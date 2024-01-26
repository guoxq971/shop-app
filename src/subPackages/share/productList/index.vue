<!--产品列表-->
<template>
  <view class="productList-layout">
    <!--顶部导航栏123-->
    <bmNavbar />
    <view class="part-wrap">
      <Icon @click="onBack" class="bm-icon" name="arrow-left" />
      <view>{{ categoryName }} - {{ tagName }}</view>
    </view>

    <view class="body-wrap">
      <view class="advertised" style="height: 100rpx; margin-bottom: 10rpx">广告1</view>
      <view class="advertised" style="height: 360rpx">广告2</view>

      <!--特色商品-->
      <view class="featured-commodity-wrap">
        <view class="featured-commodity-wrap-title">
          <view class="title-left">Featured</view>
          <view class="title-right">VIEW ALL</view>
        </view>

        <view class="list">
          <view class="item" v-for="item in featuredProductList" :key="item.id">
            <!--图-->
            <view class="image-wrap">
              <view class="hot">SHIPS FREE</view>
              <image :src="item.url"></image>
            </view>
            <!--标题-->
            <TextEllipsis class="title" rows="2" :content="item.title" />
            <!--评星 + 评论数-->
            <view class="line org-price">评星 + 评论数</view>
            <view class="line diff-num">价格</view>
          </view>
        </view>
      </view>

      <!--商品列表-->
      <view class="goods-wrap">
        <!--条件栏-->
        <view class="condition-wrap">
          <!--畅销-->
          <view class="item active-item">Best Selling</view>
          <!--价格-->
          <view class="item">Price</view>
          <!--过滤条件-->
          <view class="item">Filter & Sort</view>
        </view>

        <!--列表-->
        <view class="list-wrap">
          <view class="item" v-for="item in productList" :key="item.id">
            <view class="image-wrap">
              <view class="hot">SHIPS FREE</view>
              <image :src="item.url"></image>
            </view>
            <view class="line title">标题</view>
            <view class="line comment">评星 + 评论数</view>
            <view class="line now-price">标题</view>
          </view>

          <!--更多-->
          <view class="more">
            <view class="more-btn">LOAD MORE PRODUCTS</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { Icon, TextEllipsis } from 'vant';
import bmNavbar from '@/subPackages/share/navbar.vue';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { randomTool, randomImage, randomWord, uuid } from '@/utils/commom';

function onBack() {
  uni.navigateBack();
}

// 分类
const categoryName = ref('');
// 标签
const tagName = ref('');
onLoad((e) => {
  console.log('onload 产品列表 e', e);
  categoryName.value = e.categoryName;
  tagName.value = e.tagName;
});

// 特色商品
const featuredProductList = ref(
  Array.from({ length: 10 }, () => {
    return {
      id: randomTool.uuid(),
      name: randomTool.word(),
      url: randomTool.image(),
      title: randomTool.title(5),
      price: randomTool.price(),
      commentCount: randomTool.num(),
      commentLevel: randomTool.num(0, 5),
    };
  }),
);

// 商品列表
const productList = ref(
  Array.from({ length: 21 }, () => {
    return {
      id: randomTool.uuid(),
      name: randomTool.word(),
      url: randomTool.image(),
    };
  }),
);
</script>

<style scoped lang="scss">
$searchPaddingLeftRight: 18rpx;
.productList-layout {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: calc(100vh);

  .part-wrap {
    display: flex;
    align-items: center;
    padding: 16rpx;
    border-bottom: 2rpx solid rgb(235, 237, 240);
    font-weight: bold;
    font-size: 28rpx;
    font-family: 'monica-ext-font_YIBBBFG', serif;
    letter-spacing: 0.8rpx;

    .bm-icon {
      margin-right: 8rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: var(--van-nav-bar-icon-color);
    }
  }

  .body-wrap {
    flex: 1;
    overflow: auto;

    // 广告
    .advertised {
      background: #f2f2f2;
      border-top: 2rpx solid #bbb;
      border-bottom: 2rpx solid #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
    }

    // 特色商品
    .featured-commodity-wrap {
      padding: 10rpx $searchPaddingLeftRight;

      .featured-commodity-wrap-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        font-weight: bold;
        margin-bottom: 10rpx;
        .title-left {
        }
        .title-right {
          text-decoration: underline;
          font-weight: 300;
          font-size: 26rpx;
        }
      }
      // 特色商品-列表
      .list {
        display: flex;
        overflow: auto;
        $itemWidth: 420rpx;

        .item {
          min-width: $itemWidth;
          margin-right: 20rpx;
          border-radius: 4px;
          overflow: hidden;
          &:last-child {
            margin-right: 0;
          }

          .image-wrap {
            margin-bottom: 24rpx;
            width: $itemWidth;
            height: calc($itemWidth + 50rpx);
            border: 2rpx solid #f2f2f2;
            border-radius: 8rpx;
            overflow: hidden;
            position: relative;
            .hot {
              position: absolute;
              top: 5rpx;
              right: 5rpx;
              background-color: #f2f2f2;
              border: 2rpx solid #bbb;
              padding: 10rpx 6rpx;
              font-size: 20rpx;
              z-index: 1;
            }
            image {
              width: 100%;
              height: 100%;
            }
          }

          .line {
            height: 44rpx;
            font-size: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;
          }
          .now-price {
            margin-bottom: 6rpx;
          }
          .org-price {
            margin-bottom: 6rpx;
          }
          .diff-num {
          }
          .title {
            font-size: 28rpx;
            color: #646464;
            letter-spacing: 2rpx;
            text-align: center;
            line-height: 1.2;
          }
        }
      }
    }

    // 商品列表
    .goods-wrap {
      margin-top: 20px;
      padding: 10rpx $searchPaddingLeftRight;

      // 条件
      .condition-wrap {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 10px;
        .item {
          border-bottom: 2px solid #bbb;
          padding: 3px 6px;
          font-size: 13px;
          letter-spacing: 0.4px;
        }
        .active-item {
          border-bottom: 2px solid var(--van-nav-bar-icon-color);
        }
      }

      // 列表
      .list-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: auto;
        .item {
          width: 49%;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20rpx;

          .image-wrap {
            margin-bottom: 18rpx;
            width: 100%;
            height: 450rpx;
            border: 2rpx solid #f2f2f2;
            border-radius: 8rpx;
            overflow: hidden;
            position: relative;
            .hot {
              position: absolute;
              top: 5rpx;
              right: 5rpx;
              background-color: #f2f2f2;
              border: 2rpx solid #bbb;
              padding: 10rpx 6rpx;
              font-size: 20rpx;
              z-index: 1;
            }
            image {
              width: 100%;
              height: 100%;
            }
          }
          .line {
            height: 44rpx;
            font-size: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;
          }
          .now-price {
            margin-bottom: 6rpx;
          }
          .comment {
            margin-bottom: 6rpx;
          }
          .title {
            height: 90rpx;
            margin-bottom: 6rpx;
          }
        }

        .more {
          margin-top: 26rpx;
          margin-bottom: 10rpx;
          width: 100%;
          display: flex;
          justify-content: center;
          .more-btn {
            border: 2rpx solid #4d4d4d;
            padding: 14rpx 32rpx;
          }
        }
      }
    }
  }
}
</style>
