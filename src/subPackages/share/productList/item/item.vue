<!--商品盒子-->
<template>
  <view class="goods-item">
    <!--图-->
    <view class="image-wrap">
      <view class="hot">SHIPS FREE</view>
      <image :src="item.url"></image>
    </view>
    <!--标题-->
    <TextEllipsis class="title" rows="2" :content="item.title" />
    <!--评星 + 评论数-->
    <view class="line comment">
      <Rate v-model="item.commentLevel" :size="14" color="#ffd21e" void-icon="star" void-color="#eee" allow-half :count="5" readonly />
      <view class="comment-count">({{ item.commentCount }})</view>
    </view>
    <view class="line price">${{ item.price }}</view>
  </view>
</template>

<script setup>
import { Rate, TextEllipsis } from 'vant';
const props = defineProps({
  width: { type: String, default: '100%' },
  item: { type: Object, default: () => {} },
});
</script>

<style scoped lang="scss">
$itemWidth: v-bind('props.width');
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
    margin-bottom: 16rpx;
    width: $itemWidth;
    height: calc($itemWidth + 50rpx);
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
</style>
