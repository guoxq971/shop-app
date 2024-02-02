<!--商品列表-->
<template>
  <view class="bm-goods-list" :class="{ 'bm-goods-list-wrap': isCol }">
    <view class="goods-item" v-for="item in list" :key="item.id" @click="onDetail(item)">
      <!--图-->
      <bmBox :width="imageWidth">
        <view class="image-wrap">
          <view class="hot">SHIPS FREE</view>
          <VanImage :src="$basePathImg + item.url"></VanImage>
        </view>
      </bmBox>

      <!--标题-->
      <TextEllipsis class="title" rows="2" :content="item.title" />

      <!--评星 + 评论数-->
      <view class="line comment">
        <Rate v-model="item.commentLevel" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
        <view class="comment-count">({{ item.commentCount }})</view>
      </view>

      <!--价格-->
      <view class="line price">${{ item.price }}</view>
    </view>
  </view>
</template>

<script setup>
import { Rate, TextEllipsis, Image as VanImage } from 'vant';
import bmBox from '@/components/bm/box/box.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  // type: row | col
  type: { type: String, default: 'row' },
  list: { type: Array, default: () => [] },
});
const isCol = computed(() => props.type === 'col');
const width = computed(() => (isCol.value ? '48.8%' : '320rpx'));
const imageWidth = computed(() => (isCol.value ? '100%' : width));

// 详情
function onDetail(item) {
  uni.navigateTo({
    url: `/subPackages/share/productDetail/productDetail?id=${item.id}`,
  });
}
</script>

<style scoped lang="scss">
:deep(.van-image) {
  width: 100%;
  height: 100%;
}

.bm-goods-list-wrap {
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 0 !important;

  .goods-item {
    margin-right: 0 !important;
    margin-bottom: 20rpx;
  }
}
.bm-goods-list {
  display: flex;
  overflow: auto;
  padding-bottom: 20rpx;
  width: 100%;

  $itemWidth: v-bind(width);
  .goods-item {
    min-width: $itemWidth;
    width: $itemWidth;
    margin-right: 20rpx;
    border-radius: 4px;
    overflow: hidden;
    border: 2rpx solid #e8e8e8;
    &:last-child {
      margin-right: 0;
    }

    .image-wrap {
      width: 100%;
      height: 100%;
      position: relative;

      .hot {
        position: absolute;
        top: 5rpx;
        right: 10rpx;
        background-color: #d54d4d;
        color: #fff;
        padding: 18rpx 26rpx;
        z-index: 1;
        letter-spacing: 0.6rpx;
        font-size: 24rpx;
        border-radius: 4rpx;
      }

      image {
        width: 100%;
        height: 100%;
      }
    }

    .title {
      font-size: 28rpx;
      color: #646464;
      letter-spacing: 2rpx;
      text-align: center;
      line-height: 1.2;
      margin-top: 16rpx;
      margin-bottom: 18rpx;
    }

    .line {
      height: 44rpx;
      font-size: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .comment {
      margin-bottom: 6rpx;
      .comment-count {
        color: #2525ee;
        font-size: 28rpx;
        margin-left: 10rpx;
      }
    }
    .price {
      margin-bottom: 6rpx;
      color: #5aa8a1;
      font-size: 14px;
    }
  }
}
</style>
