<!--sku商品联级选择-->
<template>
  <view class="options-container">
    <view class="options-wrap" v-for="(item, index) in specList" :key="index">
      <view class="option-title">{{ item.title }}</view>
      <view class="option-list">
        <view
          class="option-list-item"
          :class="[selectSpec[item.title] === its.name ? 'active-option-list-item' : '', its.able ? '' : 'disabled-option-list-item']"
          v-for="(its, ins) in item.list"
          :key="its.name + ins"
        >
          <view @click="changeSpec(item.title, its.name, its.able)">
            {{ its.name }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  specList: {
    type: Array,
    default: () => [],
  },
  selectSpec: {
    type: Object,
    default: () => ({}),
  },
  changeSpec: {
    type: Function,
    default: () => {},
  },
});
</script>

<style scoped lang="scss">
// 购买选项
.options-container {
  .options-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    &:last-child {
      margin-bottom: 0;
    }
    .option-title {
      display: flex;
      font-size: 26rpx;
      color: #8e8e8e;
      margin-bottom: 6rpx;
    }
    .option-list {
      display: flex;
      flex-wrap: wrap;
      .option-list-item {
        display: flex;
        padding: 16rpx 20rpx;
        background: #fff;
        border: 2rpx solid #bbb;
        border-radius: 4rpx;
        font-size: 28rpx;
        margin: 0 20rpx 4rpx 0;
      }
      .active-option-list-item {
        background: #000;
        color: #fff;
      }
      .disabled-option-list-item {
        background: gray;
        color: #fff;
      }
    }
  }
}
</style>
