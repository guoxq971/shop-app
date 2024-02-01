<!--产品列表-->
<template>
  <view class="productList-layout">
    <!--顶部导航栏-->
    <bmNavbar />

    <!--主题名称 & back-->
    <view class="part-wrap">
      <Icon @click="onBack" class="bm-icon" name="arrow-left" />
      <view>{{ categoryName }} - {{ tagName }}</view>
    </view>

    <!--主体-内容-->
    <view class="body-wrap">
      <!--广告-->
      <Advertised height="100rpx" :src="advertisedList[0].url" />
      <Advertised height="360rpx" :src="advertisedList[1].url" />

      <!--特色商品-->
      <view class="featured-commodity-wrap">
        <view class="featured-commodity-wrap-title">
          <view class="title-left">Featured</view>
          <view class="title-right">VIEW ALL</view>
        </view>

        <GoodsList :list="featuredProductList" />
      </view>

      <!--商品列表-->
      <view class="goods-wrap">
        <!--条件栏-->
        <view class="condition-wrap">
          <!--畅销-->
          <view class="item">
            <text>Best Selling</text>
            <Icon name="bar-chart-o" />
          </view>
          <!--价格-->
          <view class="item active-item" @click="onSortGetGoodsList">
            <text>Price</text>
            <Icon name="filter-o" />
          </view>
          <!--过滤条件-->
          <view class="item">
            <text>Filter & Sort</text>
            <Icon name="setting-o" />
          </view>
        </view>

        <!--列表-->
        <goodsListMore v-model:list="productList" :getList="getGoodsList" v-model:param="param" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { Icon } from 'vant';
import bmNavbar from '@/subPackages/share/navbar.vue';
import GoodsList from '../components/goodsList/goodsList.vue';
import goodsListMore from '../components/goodsList/goodsListMore.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { randomTool, randomImage, randomWord, uuid } from '@/utils/commom';
import { getGoodsRecommendApi, getGoodsListApi } from '@/api/share/share';
import { useAdvertisedStore } from '@/store/useAdvertisedStore';
import Advertised from '@/subPackages/share/components/advertised.vue';
import { storeToRefs } from 'pinia';

// 返回上一页
function onBack() {
  uni.navigateBack();
}

onShow(() => {
  getRecommendGoodsList();
  param.value.pageNum = 1;
  getGoodsList();
  adStore.getAdvertising({ sort: 21 });
});

// 广告
const adStore = useAdvertisedStore();
const { advertisedList } = storeToRefs(adStore);

// 获取推荐商品列表
function getRecommendGoodsList() {
  getGoodsRecommendApi().then((res) => {
    // console.log('获取推荐商品列表', res);
    featuredProductList.value = res.data.map((e) => {
      return {
        detail: e,
        id: e.prodId,
        url: e.imgList.length ? e.imgList[0] : '',
        title: e.prodName,
        price: e.price,
        commentCount: e.commentQuantity,
        commentLevel: e.starRating,
      };
    });
  });
}

// 获取商品列表
function getGoodsList(more = false) {
  return getGoodsListApi(param.value).then((res) => {
    // console.log('获取商品列表', res);
    const l = res.data.records.map((e) => {
      return {
        detail: e,
        id: e.prodId,
        url: e.pic,
        title: e.prodName,
        price: e.price,
        commentCount: e.commentQuantity,
        commentLevel: e.starRating,
      };
    });

    if (!more) {
      productList.value = l;
    }

    return l;
  });
}
//排序获取商品列表
function onSortGetGoodsList() {
  param.value.pageNum = 1;
  param.value.priceSort = param.value.priceSort === '0' ? '1' : '0';
  getGoodsList();
}

// 分类
const categoryName = ref('');
// 标签
const tagName = ref('');
onLoad((e) => {
  // console.log('onload 产品列表 e', e);
  categoryName.value = e.categoryName;
  tagName.value = e.tagName;
  param.value.categoryId = e.categoryId;
});

// 特色商品
const featuredProductList = ref([]);
// featuredProductList.value = randomTool.goodsList(21);

// 商品列表
const param = ref({
  categoryId: '', //分类id
  priceSort: '0', //价格排序(0-升序 1-降序)
  notProdId: '', //不包含的商品id
  pageNum: 1, //页码
  pageSize: 20, //每页数量
});
const productList = ref([]);
// productList.value = randomTool.goodsList(21);
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
        padding: 24rpx 0 18rpx 0;
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
      // 商品列表-列表
      .list {
        display: flex;
        overflow: auto;
        padding-bottom: 20rpx;
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
        gap: 40rpx;
        margin-bottom: 20rpx;
        .item {
          border-bottom: 4rpx solid #bbb;
          padding: 6rpx 12rpx;
          font-size: 26rpx;
          letter-spacing: 0.8rpx;
        }
        .active-item {
          border-bottom: 4rpx solid var(--van-nav-bar-icon-color);
        }
      }
    }
  }
}
</style>
