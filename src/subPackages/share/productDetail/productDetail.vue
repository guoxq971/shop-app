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
          <VanImage @click="onPreview(item.url)" style="width: 100%; height: 600rpx" :src="$basePathImg + item.url"></VanImage>
        </SwipeItem>
        <template #indicator="{ active, total }">
          <view class="preview-list">
            <view @click="onSwipe(index)" class="image-wrap" :class="{ 'active-image': index === active }" v-for="(item, index) in detail.imageList" :key="item.id">
              <VanImage :src="$basePathImg + item.url"></VanImage>
            </view>
          </view>
        </template>
      </Swipe>

      <GapWrap />

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

      <GapWrap />

      <!--颜色/风格-->
      <ColorStyleWrap type="row" :list="detail.styleList" v-model:active="activeStyle" />

      <GapWrap />

      <!--尺码-->
      <sizeListWrap :list="detail.sizeList" v-model:active="activeSize" />

      <GapWrap />

      <!--定制-->
      <CustomizationWrap
        v-model:front-name="detail.customization.frontName"
        v-model:front-number="detail.customization.frontNumber"
        v-model:back-name="detail.customization.backName"
        v-model:back-number="detail.customization.backNumber"
      ></CustomizationWrap>

      <GapWrap />

      <!--商品详情信息-->
      <view class="goods-info-container" v-if="detail.intro">
        <view class="chunk-wrap">
          <text class="title">商品简介</text>
          <view>{{ detail.intro }}</view>
          <!--          <VanImage :src="detail.intro" height="200px"></VanImage>-->
        </view>
        <!--        <view class="chunk-wrap">-->
        <!--          <text class="title">库存描述</text>-->
        <!--          <VanImage :src="detail.stock" height="200px"></VanImage>-->
        <!--        </view>-->
        <!--        <view class="chunk-wrap">-->
        <!--          <text class="title">物流描述</text>-->
        <!--          <VanImage :src="detail.logistics" height="200px"></VanImage>-->
        <!--        </view>-->
        <GapWrap />
      </view>

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
              <VanImage class="head-image-wrap" round :src="$basePathImg + item.headUrl"></VanImage>
              <view class="name">{{ item.name }}</view>
            </view>

            <!--评星-->
            <Rate class="rate" v-model="item.level" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />

            <!--内容-->
            <TextEllipsis class="content" rows="3" expand-text="spread" :content="item.content"></TextEllipsis>

            <!--图-->
            <view class="image-wrap">
              <VanImage @click="onPreview(img.url)" class="image" :src="$basePathImg + img.url" v-for="img in item.imageList" :key="img.id"></VanImage>
            </view>
          </view>
        </view>

        <template v-if="detail.comment.list.length">
          <!--查看更多评论-->
          <view class="see-more" @click="onMoreComment">See more reviews ></view>
        </template>
        <template v-if="detail.comment.list.length === 0">
          <view class="not-data">not data</view>
        </template>
      </view>

      <GapWrap />

      <!--商品列表-->
      <view class="goods-list-container" v-if="detail.goodsList.length">
        <view class="title">Matching</view>

        <GoodsListMore v-model:list="detail.goodsList" />
      </view>
    </view>

    <!--固定底部-->
    <view class="tabbar-wrap">
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
  <SelectProductDetailPop ref="selectProductDetailPopRef" />
  <!--购物车-弹窗-->
  <ShoppingCartPop ref="shoppingCartPopRef" />
</template>

<script setup>
import { Icon, Rate, TextEllipsis, Swipe, SwipeItem, Image as VanImage, showImagePreview } from 'vant';
import GapWrap from '../components/gapWrap/gapWrap.vue';
import GoodsListMore from '../components/goodsList/goodsListMore.vue';
import SelectProductDetailPop from '../selectProductDetailPop/selectProductDetailPop.vue';
import ShoppingCartPop from '../shoppingCartPop/shoppingCartPop.vue';
import ColorStyleWrap from '../components/colorStyleWrap/colorStyleWrap.vue';
import SizeListWrap from '../components/sizeListWrap/sizeListWrap.vue';
import CustomizationWrap from '../components/customizationWrap/customizationWrap.vue';
import { ref, watch } from 'vue';
import { randomTool } from '@/utils/commom';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { onLoad } from '@dcloudio/uni-app';
import { getDetailApi, getListCommentApi, getRelationApi } from '@/api/share/share';
const { tabBarHeightUnit } = useSystemInfo();

// 返回上一页
function onGoBack() {
  uni.navigateBack();
}

const prodId = ref('');
onLoad((e) => {
  console.log('onload e 产品详情', e);
  prodId.value = e.id;
  getGoodsDetail();
});

let uniqueArray = (list, fName) => {
  return Array.from(new Set(list.map((item) => item[fName]))).map((fieldName) => {
    return list.find((item) => item[fName] === fieldName);
  });
};
// 获取商品详情
function getGoodsDetail() {
  detail.value.comment.list = [];
  detail.value.goodsList = [];
  getDetailApi({ prodId: prodId.value }).then((res) => {
    console.log('商品详情', res);
    const d = res.data;
    skuList.value = d.skuList.map((e) => {
      const propArr = e.properties.split(';');
      let color = '';
      let size = '';
      for (let propItem of propArr) {
        const item = propItem.split(':');
        if (item[0] === 'color') {
          color = item[1];
        }
        if (item[0] === 'size') {
          size = item[1];
        }
      }
      return {
        detail: e,
        skuId: e.skuId,
        color,
        size,
      };
    });
    let colorList = [];
    let sizeList = uniqueArray(
      skuList.value.map((e) => {
        return {
          detail: e,
          skuId: e.skuId,
          id: randomTool.uuid(),
          name: e.size,
          url: e.detail.pic,
          color: e.color,
          size: e.size,
          disabled: false,
        };
      }),
      'name',
    );
    let styleList = uniqueArray(
      skuList.value.map((e) => {
        return {
          detail: e,
          skuId: e.skuId,
          id: randomTool.uuid(),
          name: e.color,
          color: e.color,
          size: e.size,
          url: e.detail.pic,
          disabled: false,
        };
      }),
      'name',
    );
    console.log('skuList', skuList.value);
    console.log('styleList', styleList);
    console.log('sizeList', sizeList);

    detail.value.prodId = d.prodId;
    detail.value.url = d.pic;
    detail.value.imageList = d.imgList.map((e) => ({ id: randomTool.uuid(), url: e }));
    detail.value.price = d.price;
    detail.value.oldPrice = d.oriPrice;
    detail.value.review = '';
    detail.value.paid = d.payQuantity;
    detail.value.title = d.prodName;
    detail.value.colorList = colorList;
    detail.value.styleList = styleList;
    detail.value.sizeList = sizeList;
    // detail.value.colorList = d.propertiesList.filter((e) => e.propName === 'color').map((e) => ({ id: randomTool.uuid(), name: e.propValue, url: '' }));
    // detail.value.styleList = detail.value.colorList;
    // detail.value.sizeList = d.propertiesList.filter((e) => e.propName === 'size').map((e) => ({ id: randomTool.uuid(), name: e.propValue }));
    // 简介, 库存, 物流描述
    detail.value.intro = d.centent;
    // detail.value.stock = '';
    // detail.value.logistics = '';
    detail.value.level = d.starRating;
    detail.value.comment.count = d.commentQuantity;
  });
  getListComment();
  // getRelation();
}
// 获取商品相关评论
function getListComment(type = 0) {
  getListCommentApi({ prodId: prodId.value, type: type }).then((res) => {
    console.log('评论列表', res);
    detail.value.comment.list = res.data.map((e) => ({
      detail: e,
      id: randomTool.uuid(),
      headUrl: e.userName,
      name: e.userName,
      level: e.score,
      content: e.content,
      imageList: [],
    }));
  });
}
// 获取商品相关产品
function getRelation() {
  getRelationApi({ prodId: prodId.value }).then((res) => {
    console.log('相关产品', res);
    detail.value.goodsList = res.data.map((e) => ({
      detail: e,
      id: e.prodId,
      name: e.prodName,
      url: e.pic,
      title: e.prodName,
      price: e.price,
      oldPrice: e.oriPrice,
    }));
  });
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
    title: 'custom',
    icon: 'none',
  });
}

// 购物车
const shoppingCartPopRef = ref(null);
function onCart() {
  shoppingCartPopRef.value.open();
}

// 加入购物车
const selectProductDetailPopRef = ref(null);
function onAddToCart() {
  selectProductDetailPopRef.value.open({
    type: 'cart',
    prodId: detail.value.prodId,
    sizeList: detail.value.sizeList,
    activeSize: activeSize.value,
    colorStyleList: detail.value.styleList,
    activeStyleColor: activeStyle.value,
    customization: detail.value.customization,
    skuList: skuList.value,
  });
}

// 立即购买
function onBuyNow() {
  selectProductDetailPopRef.value.open({
    type: 'buy',
    sizeList: detail.value.sizeList,
    activeSize: activeSize.value,
    colorStyleList: detail.value.styleList,
    activeStyleColor: activeStyle.value,
    customization: detail.value.customization,
  });
}

const skuList = ref([]);
const detail = ref({
  prodId: '',
  url: '', //randomTool.image(),
  imageList: Array.from({ length: 0 }, () => ({ id: randomTool.uuid(), url: randomTool.image() })),
  // 价格
  price: '', //randomTool.price(),
  oldPrice: '', //randomTool.price(),
  // 预览数量
  review: '2k',
  // 付费数量
  paid: '20w',
  // 标题
  title: '', //randomTool.title(),
  // 颜色列表
  colorList: Array.from({ length: 0 }, () => ({ id: randomTool.uuid(), name: randomTool.color() })),
  // 样式列表
  styleList: Array.from({ length: 0 }, () => ({ id: randomTool.uuid(), url: randomTool.image() })),
  // 尺码列表
  sizeList: [
    // { id: randomTool.uuid(), name: 'XS' },
    // { id: randomTool.uuid(), name: 'S' },
    // { id: randomTool.uuid(), name: 'M' },
    // { id: randomTool.uuid(), name: 'L' },
    // { id: randomTool.uuid(), name: 'XL' },
    // { id: randomTool.uuid(), name: '2XL' },
    // { id: randomTool.uuid(), name: '2XLLLLLLLLLLLLLL' },
  ],
  // 定制
  customization: {
    frontName: '',
    frontNumber: '',
    backName: '',
    backNumber: '',
  },
  // 简介
  intro: '', //randomTool.image(),
  // 库存
  stock: randomTool.image(),
  // 物流描述
  logistics: randomTool.image(),
  // 等级
  level: 0, //randomTool.num(0, 5),
  // 评论
  comment: {
    count: 0,
    list: Array.from({ length: 0 }, () => ({
      id: randomTool.uuid(),
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
  goodsList: randomTool.goodsList(0),
});

// 轮播切换到指定位置
const swipeRef = ref(null);
const onSwipe = (index) => {
  swipeRef.value.swipeTo(index);
};

// 切换颜色/样式
const activeStyle = ref('');
watch(activeStyle, (val) => {
  if (val === '') {
    detail.value.sizeList.forEach((e) => {
      e.disabled = false;
    });
    return;
  }
  // style.name = 当前选中的颜色
  const style = detail.value.styleList.find((e) => e.id === val);
  if (!style) return;
  // 如果skuList中存在当前选中的颜色, 则找出当前选中颜色对应的尺码
  const sizeList = skuList.value.filter((e) => e.color === style.name).map((e) => e.size);
  // sizeList中不存在sizeList的尺码, 则将其disabled
  detail.value.sizeList.forEach((e) => {
    e.disabled = !sizeList.includes(e.name);
  });
});
// 激活的尺码
const activeSize = ref('');
watch(activeSize, (val) => {
  if (val === '') {
    detail.value.styleList.forEach((e) => {
      e.disabled = false;
    });
    return;
  }
  // size.name = 当前选中的尺码
  const size = detail.value.sizeList.find((e) => e.id === val);
  if (!size) return;
  // 如果skuList中存在当前选中的尺码, 则找出当前选中尺码对应的颜色
  const colorList = skuList.value.filter((e) => e.size === size.name).map((e) => e.color);
  // styleList中不存在colorList的颜色, 则将其disabled
  detail.value.styleList.forEach((e) => {
    e.disabled = !colorList.includes(e.name);
  });
});

// 查看定制效果
function onLookEffect() {
  uni.showToast({
    title: 'see custom effect',
    icon: 'none',
  });
}

// 评论
const activeComment = ref('all');
function onCommentCut(type) {
  activeComment.value = type;
  if (type === 'all') {
    getListComment(0);
  } else if (type === 'new') {
    getListComment(1);
  }
}
// 查看更多评论
function onMoreComment() {
  uni.showToast({
    title: 'see more comment',
    icon: 'none',
  });
}
// 添加评论
function onWriteComment() {
  uni.showToast({
    title: 'add comment',
    icon: 'none',
  });
}
</script>

<style scoped lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}

$tabbarHeight: v-bind(tabBarHeightUnit);
.product-detail-container-bd {
  height: 100vh;

  // 返回上一页
  .go-back {
    position: absolute;
    top: 10rpx;
    left: 10rpx;
    z-index: 1;
    background: #000;
    color: #fff;
    padding: 14rpx;
    font-size: 24rpx;
  }

  // 底部
  .tabbar-wrap {
    display: flex;
    background-color: #fff;
    align-items: center;
    height: $tabbarHeight;
    padding: 20rpx;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    bottom: 0;

    .customer {
      width: 96rpx;
      height: 80rpx;
      border: 2rpx solid;
      font-size: 18rpx;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cart {
      width: 96rpx;
      height: 80rpx;
      border: 2rpx solid;
      font-size: 22rpx;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .add-to-card {
      width: 250rpx;
      height: 80rpx;
      border: 2rpx solid;
      font-size: 28rpx;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .buy-now {
      width: 212rpx;
      height: 80rpx;
      border: 2rpx solid;
      font-size: 28rpx;
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
  padding: 0 20rpx;

  // 列表图
  .preview-list {
    display: flex;
    padding: 6rpx 0 20rpx 0;
    overflow: auto;

    .image-wrap {
      min-width: 130rpx;
      height: 130rpx;
      margin-right: 14rpx;
      border-radius: 8rpx;
      overflow: hidden;
      border: 4rpx solid transparent;
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
      border: 4rpx solid var(--primary-color);
    }
  }

  // 价格 & 预览 & 标题
  .info-container {
    .price-preview-wrap {
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;

      .price-wrap {
        display: flex;
        align-items: center;

        .old-price {
          text-decoration: line-through;
          color: #6b6b6b;
          font-weight: bold;
          font-size: 28rpx;
        }
        .price {
          color: #d52c1c;
          font-weight: bold;
          font-size: 32rpx;
          margin-left: 20rpx;
        }
      }

      .preview-wrap {
        display: flex;
        align-items: center;
        color: #575757;
        .preview {
          margin-right: 20rpx;
        }
      }
    }

    .title {
      margin-top: 14rpx;
      font-size: 28rpx;
      line-height: 1.4;
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
        margin-bottom: 6rpx;
        font-size: 30rpx;
        font-weight: bold;
      }
    }
  }

  // 评论
  .comment-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 34rpx;

    //  头部
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .count {
          margin-right: 14rpx;
          font-size: 32rpx;
          font-weight: 600;
        }
        .rate {
        }
      }
      .right {
        font-size: 28rpx;
        border: 2rpx solid;
        padding: 8rpx 24rpx;
      }
    }

    // 条件
    .condition-wrap {
      display: flex;
      margin-bottom: 20rpx;
      margin-top: 14rpx;
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
        padding-bottom: 8rpx;
        margin-bottom: 30rpx;
        border-bottom: 2rpx solid #bbb;
        .head-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 12rpx;

          .head-image-wrap {
            width: 50rpx;
            height: 50rpx;
            margin-right: 14rpx;
          }
          .name {
            font-size: 26rpx;
          }
        }

        .rate {
          margin-bottom: 8rpx;
        }

        .content {
          font-size: 26rpx;
          margin-bottom: 12rpx;
        }

        .image-wrap {
          display: flex;
          overflow: auto;
          padding: 0 0 20rpx 0;

          .image {
            min-width: 100rpx;
            width: 100rpx;
            height: 100rpx;
            margin-right: 16rpx;
          }
        }
      }
    }

    // 查看更多评论
    .see-more {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      margin-top: 10rpx;
      font-weight: 600;
    }
    .not-data {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 20rpx;
      color: #808080;
    }
  }

  // 商品列表
  .goods-list-container {
    display: flex;
    flex-direction: column;
    .title {
      font-weight: bold;
      font-size: 32rpx;
      margin-bottom: 18rpx;
    }
  }
}
</style>
