<!--产品详情-->
<template>
  <view class="product-detail-container-bd">
    <view class="go-back" @click="onGoBack">
      <Icon name="arrow-left"></Icon>
      <text>BACK</text>
    </view>
    <view class="product-detail-container">
      <!--轮播-->
      <Swipe ref="swipeRef">
        <SwipeItem v-for="item in detail.imageList" :key="item.id">
          <VanImage @click="onPreview(item.url)" style="width: 100%; height: 600rpx" :src="item.url"></VanImage>
        </SwipeItem>
        <template #indicator="{ active, total }">
          <view class="preview-list">
            <view @click="onSwipe(index)" class="image-wrap" :class="{ 'active-image': index === active }" v-for="(item, index) in detail.imageList" :key="item.id">
              <VanImage :src="item.url"></VanImage>
            </view>
          </view>
        </template>
      </Swipe>

      <GapWrap :size="gapSize" />

      <!--价格 & 预览 & 标题-->
      <view class="info-container">
        <view class="price-preview-wrap">
          <view class="price-wrap">
            <view class="old-price">${{ detail.oldPrice }}</view>
            <view class="price">${{ detail.price }}</view>
          </view>

          <view class="preview-wrap">
            <view class="preview">2k Review</view>
            <view>20w Paid</view>
          </view>
        </view>

        <!--标题-->
        <TextEllipsis class="title" rows="2" :content="detail.title" />
      </view>

      <GapWrap :size="gapSize" />

      <!--颜色/风格-->
      <ColorStyleWrap type="row" :list="detail.styleList" v-model:active="activeStyle" />

      <GapWrap :size="gapSize" />

      <!--尺码-->
      <sizeListWrap :list="detail.sizeList" v-model:active="activeSize" />

      <GapWrap :size="gapSize" />

      <!--定制-->
      <view class="customization-container">
        <!--标题-->
        <view class="title">Customization</view>

        <!--定制内容-->
        <view class="front-content">
          <view class="front-wrap">
            <view class="label">Front- Team Name</view>
            <Field class="ipt" v-model="detail.customization.frontName"></Field>
          </view>
          <view class="front-wrap front-wrap-number">
            <view class="label">Front- Team Number</view>
            <Field class="ipt" v-model="detail.customization.frontNumber"></Field>
          </view>
        </view>
        <view class="front-content">
          <view class="front-wrap">
            <view class="label">Back- Team Name</view>
            <Field class="ipt" v-model="detail.customization.backName"></Field>
          </view>
          <view class="front-wrap front-wrap-number">
            <view class="label">Back- Team Number</view>
            <Field class="ipt" v-model="detail.customization.backNumber"></Field>
          </view>
        </view>

        <!--查看效果-->
        <view class="look-effect" @click="onLookEffect">View the effect</view>
      </view>

      <GapWrap :size="gapSize" />

      <!--商品详情信息-->
      <view class="goods-info-container">
        <view class="chunk-wrap">
          <text class="title">商品简介</text>
          <VanImage :src="detail.intro" height="200px"></VanImage>
        </view>
        <view class="chunk-wrap">
          <text class="title">库存描述</text>
          <VanImage :src="detail.stock" height="200px"></VanImage>
        </view>
        <view class="chunk-wrap">
          <text class="title">物流描述</text>
          <VanImage :src="detail.logistics" height="200px"></VanImage>
        </view>
      </view>

      <GapWrap :size="gapSize" />

      <!--评论-->
      <view class="comment-container">
        <!--头部-->
        <view class="header-wrap">
          <view class="left">
            <view class="count">Reveiew({{ detail.comment.count }})</view>
            <Rate class="rate" v-model="detail.level" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
          </view>
          <view class="right" @click="onWriteComment">Write a review</view>
        </view>

        <!--列表选项-->
        <view class="condition-wrap">
          <view class="item" :class="{ 'active-item': activeComment === 'all' }" @click="onCommentCut('all')">
            <text>All</text>
          </view>
          <view class="item" :class="{ 'active-item': activeComment === 'new' }" @click="onCommentCut('new')">
            <text>New</text>
          </view>
          <view class="item" :class="{ 'active-item': activeComment === 'with images' }" @click="onCommentCut('with images')">
            <text>With images</text>
          </view>
        </view>

        <!--列表-->
        <view class="list-wrap">
          <view class="item" v-for="item in detail.comment.list" :key="item.id">
            <!--头像 & 名称-->
            <view class="head-wrap">
              <VanImage class="head-image-wrap" round :src="item.headUrl"></VanImage>
              <view class="name">{{ item.name }}</view>
            </view>

            <!--评星-->
            <Rate class="rate" v-model="item.level" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />

            <!--内容-->
            <TextEllipsis class="content" rows="3" expand-text="spread" :content="item.content"></TextEllipsis>

            <!--图-->
            <view class="image-wrap">
              <VanImage @click="onPreview(img.url)" class="image" :src="img.url" v-for="img in item.imageList" :key="img.id"></VanImage>
            </view>
          </view>
        </view>

        <!--查看更多评论-->
        <view class="see-more" @click="onMoreComment">See more reviews ></view>
      </view>

      <GapWrap :size="gapSize" />

      <!--商品列表-->
      <view class="goods-list-container" v-if="detail.goodsList.length">
        <view class="title">Matching</view>

        <GoodsList :list="detail.goodsList" type="col" />
      </view>
    </view>

    <!--固定底部-->
    <view class="tabbar-wrap" style="height: 50px">
      <!--定制-->
      <view class="customer" @click="onCustomer">Customer service</view>
      <!--购物车-->
      <view class="cart" @click="onCart">CART</view>
      <!--加入购物车-->
      <view class="add-to-card" @click="onAddToCart">ADD TO CART</view>
      <!--购买-->
      <view class="buy-now" @click="onBuyNow">BUY NOW</view>
    </view>
  </view>

  <!--选择产品参数-弹窗-->
  <SelectProductDetailPop ref="selectProductDetailPop" />
</template>

<script setup>
import { Icon, Field, Rate, TextEllipsis, Swipe, SwipeItem, Image as VanImage, showImagePreview, Space } from 'vant';
import GapWrap from '../gapWrap/gapWrap.vue';
import GoodsList from '../goodsList/goodsList.vue';
import SelectProductDetailPop from '../selectProductDetailPop/selectProductDetailPop.vue';
import ColorStyleWrap from '../colorStyleWrap/colorStyleWrap.vue';
import SizeListWrap from '../sizeListWrap/sizeListWrap.vue';
import { ref } from 'vue';
import { randomTool } from '@/utils/commom';
import { useSystemInfo } from '@/hooks/useSystemInfo';
useSystemInfo();
const gapSize = '18px';

// 返回上一页
function onGoBack() {
  uni.navigateBack();
}

// 预览图
function onPreview(url) {
  showImagePreview({
    images: [url],
    closeable: true,
  });
}

// 定制
function onCustomer() {
  uni.showToast({
    title: '定制',
    icon: 'none',
  });
}

// 购物车
function onCart() {
  uni.showToast({
    title: '购物车',
    icon: 'none',
  });
}

// 加入购物车
const selectProductDetailPop = ref(null);
function onAddToCart() {
  selectProductDetailPop.value.open({
    sizeList: detail.value.sizeList,
    activeSize: activeSize.value,
    colorStyleList: detail.value.styleList,
    activeStyleColor: activeStyle.value,
  });
}

// 立即购买
function onBuyNow() {
  uni.showToast({
    title: '立即购买',
    icon: 'none',
  });
}

const detail = ref({
  url: randomTool.image(),
  imageList: Array.from({ length: 7 }, () => ({ id: randomTool.uuid(), url: randomTool.image() })),
  // 价格
  price: randomTool.price(),
  oldPrice: randomTool.price(),
  // 预览
  review: '2k',
  // 排行
  paid: '20w',
  // 标题
  title: randomTool.title(),
  // 颜色列表
  colorList: Array.from({ length: 8 }, () => ({ id: randomTool.uuid(), name: randomTool.color() })),
  // 样式列表
  styleList: Array.from({ length: 8 }, () => ({ id: randomTool.uuid(), url: randomTool.image() })),
  // 尺码列表
  sizeList: [
    { id: randomTool.uuid(), name: 'XS' },
    { id: randomTool.uuid(), name: 'S' },
    { id: randomTool.uuid(), name: 'M' },
    { id: randomTool.uuid(), name: 'L' },
    { id: randomTool.uuid(), name: 'XL' },
    { id: randomTool.uuid(), name: '2XL' },
    { id: randomTool.uuid(), name: '2XLLLLLLLLLLLLLL' },
  ],
  // 定制
  customization: {
    frontName: '',
    frontNumber: '',
    backName: '',
    backNumber: '',
  },
  // 简介
  intro: randomTool.image(),
  // 库存
  stock: randomTool.image(),
  // 物流描述
  logistics: randomTool.image(),
  // 等级
  level: randomTool.num(0, 5),
  // 评论
  comment: {
    count: 10,
    list: Array.from({ length: 10 }, () => ({
      id: randomTool.uuid(),
      type: 'new',
      headUrl: randomTool.image(),
      name: randomTool.word(2),
      level: randomTool.num(0, 5),
      content: randomTool.title(randomTool.num(5, 50)),
      imageList: Array.from({ length: randomTool.num(0, 5) }, () => ({
        id: randomTool.uuid(),
        url: randomTool.image(),
      })),
    })),
  },
  // 商品列表
  goodsList: randomTool.goodsList(randomTool.num(0, 10)),
});

// 轮播切换到指定位置
const swipeRef = ref(null);
const onSwipe = (index) => {
  swipeRef.value.swipeTo(index);
};

// 切换颜色/样式
const activeStyle = ref(detail.value.styleList[0].id);

// 激活的尺码
const activeSize = ref(detail.value.sizeList[0].id);
function onActiveSize(item) {
  activeSize.value = item.id;
}

// 查看定制效果
function onLookEffect() {
  uni.showToast({
    title: '查看定制效果',
    icon: 'none',
  });
}

// 评论
const activeComment = ref('all');
function onCommentCut(type) {
  activeComment.value = type;
}
// 查看更多评论
function onMoreComment() {
  uni.showToast({
    title: '查看更多评论',
    icon: 'none',
  });
}
// 添加评论
function onWriteComment() {
  uni.showToast({
    title: '添加评论',
    icon: 'none',
  });
}
</script>

<style scoped lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}

$tabbarHeight: 50px;
.product-detail-container-bd {
  height: 100vh;

  // 返回上一页
  .go-back {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    background: #000;
    color: #fff;
    padding: 7px;
    font-size: 12px;
  }

  // 底部
  .tabbar-wrap {
    display: flex;
    align-items: center;
    height: $tabbarHeight;
    padding: 10px;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    bottom: 0;

    .customer {
      width: 48px;
      height: 40px;
      border: 1px solid;
      font-size: 9px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cart {
      width: 48px;
      height: 40px;
      border: 1px solid;
      font-size: 11px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .add-to-card {
      width: 125px;
      height: 40px;
      border: 1px solid;
      font-size: 14px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .buy-now {
      width: 106px;
      height: 40px;
      border: 1px solid;
      font-size: 14px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.product-detail-container {
  height: calc(100vh - $tabbarHeight);
  overflow: auto;
  padding: 0 10px;

  // 列表图
  .preview-list {
    display: flex;
    padding: 3px 0 10px 0;
    overflow: auto;

    .image-wrap {
      min-width: 65px;
      height: 65px;
      margin-right: 7px;
      border-radius: 4px;
      overflow: hidden;
      border: 2px solid transparent;
      &:first-child {
        margin-left: auto;
      }
      &:last-child {
        margin-right: auto;
      }
      image {
        width: 100%;
        height: 100%;
      }
    }
    .active-image {
      border: 2px solid var(--primary-color);
    }
  }

  // 价格 & 预览 & 标题
  .info-container {
    .price-preview-wrap {
      display: flex;
      justify-content: space-between;
      font-size: 13px;

      .price-wrap {
        display: flex;
        align-items: center;

        .old-price {
          text-decoration: line-through;
          color: #6b6b6b;
          font-weight: bold;
          font-size: 14px;
        }
        .price {
          color: #d52c1c;
          font-weight: bold;
          font-size: 16px;
          margin-left: 10px;
        }
      }

      .preview-wrap {
        display: flex;
        align-items: center;
        color: #575757;
        .preview {
          margin-right: 10px;
        }
      }
    }

    .title {
      margin-top: 7px;
      font-size: 14px;
      line-height: 1.4;
    }
  }

  // 定制
  .customization-container {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
      font-size: 14px;
    }
    .front-content {
      margin-top: 8px;
      display: flex;
      .front-wrap {
        flex: 7;
        position: relative;
        .label {
          font-size: 12px;
          margin-bottom: 2px;
          white-space: nowrap;
        }
        .ipt {
          border: 1px solid #a9a9a9;
          padding: 6px 10px 3px 10px;
          :deep(.van-field__control) {
            font-size: 18px;
          }
        }
      }
      .front-wrap-number {
        flex: 3;
        margin-left: 10px;
      }
    }
    .look-effect {
      width: 60%;
      border: 1px solid #323233;
      height: 37px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 11px auto 0 auto;
    }
  }

  // 商品信息
  .goods-info-container {
    display: flex;
    flex-direction: column;

    .chunk-wrap {
      margin-bottom: 6px;

      .title {
        display: flex;
        justify-content: center;
        margin-bottom: 3px;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }

  // 评论
  .comment-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 17px;

    //  头部
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .count {
          margin-right: 7px;
          font-size: 16px;
          font-weight: 600;
        }
        .rate {
        }
      }
      .right {
        font-size: 14px;
        border: 1px solid;
        padding: 4px 12px;
      }
    }

    // 条件
    .condition-wrap {
      display: flex;
      margin-bottom: 20rpx;
      margin-top: 7px;
      .item {
        border-bottom: 4rpx solid transparent;
        padding: 6rpx 12rpx;
        font-size: 26rpx;
        letter-spacing: 0.8rpx;
        margin-right: 20rpx;
      }
      .active-item {
        border-bottom: 4rpx solid var(--van-nav-bar-icon-color);
      }
    }

    // 列表
    .list-wrap {
      .item {
        display: flex;
        flex-direction: column;
        padding-bottom: 4px;
        margin-bottom: 15px;
        border-bottom: 1px solid #bbb;
        .head-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 6px;

          .head-image-wrap {
            width: 50rpx;
            height: 50rpx;
            margin-right: 7px;
          }
          .name {
            font-size: 13px;
          }
        }

        .rate {
          margin-bottom: 4px;
        }

        .content {
          font-size: 13px;
          margin-bottom: 6px;
        }

        .image-wrap {
          display: flex;
          overflow: auto;
          padding: 0 0 10px 0;

          .image {
            min-width: 50px;
            width: 50px;
            height: 50px;
            margin-right: 8px;
          }
        }
      }
    }

    // 查看更多评论
    .see-more {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      margin-top: 5px;
      font-weight: 600;
    }
  }

  // 商品列表
  .goods-list-container {
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 9px;
    }
  }
}
</style>
