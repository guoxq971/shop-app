<!--定制-->
<template>
  <view class="customization-container">
    <!--标题-->
    <view class="title">Customization</view>

    <!--定制内容-->
    <view class="front-content">
      <view class="front-wrap">
        <view class="label">Front- Team Name</view>
        <Field class="ipt" v-model="frontName"></Field>
      </view>
      <view class="front-wrap front-wrap-number">
        <view class="label">Front- Team Number</view>
        <Field class="ipt" v-model="frontNumber"></Field>
      </view>
    </view>
    <view class="front-content">
      <view class="front-wrap">
        <view class="label">Back- Team Name</view>
        <Field class="ipt" v-model="backName"></Field>
      </view>
      <view class="front-wrap front-wrap-number">
        <view class="label">Back- Team Number</view>
        <Field class="ipt" v-model="backNumber"></Field>
      </view>
    </view>

    <!--查看效果-->
    <view class="look-effect" @click="onLookEffect">View the effect</view>
  </view>
</template>

<script setup>
import { Field } from 'vant';
import { useVModels } from '@vueuse/core';

const emit = defineEmits(['update:frontName', 'update:frontNumber', 'update:backName', 'update:backNumber']);
const props = defineProps({
  frontName: { type: String, default: '' },
  frontNumber: { type: String, default: '' },
  backName: { type: String, default: '' },
  backNumber: { type: String, default: '' },
});

const { frontName, frontNumber, backName, backNumber } = useVModels(props, emit);

// 查看定制效果
function onLookEffect() {
  uni.showToast({
    title: 'view the effect',
    icon: 'none',
  });
}
</script>

<style scoped lang="scss">
.customization-container {
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 14px;
  }
  .front-content {
    margin-top: 16rpx;
    display: flex;
    .front-wrap {
      flex: 7;
      position: relative;
      .label {
        font-size: 24rpx;
        margin-bottom: 4rpx;
        white-space: nowrap;
      }
      .ipt {
        border: 2rpx solid #a9a9a9;
        padding: 12rpx 20rpx 6rpx 20rpx;
        :deep(.van-field__control) {
          font-size: 18px;
        }
      }
    }
    .front-wrap-number {
      flex: 3;
      margin-left: 20rpx;
    }
  }
  .look-effect {
    width: 45%;
    border: 2rpx solid #323233;
    height: 74rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 22rpx 0 0 0;
  }
}
</style>
