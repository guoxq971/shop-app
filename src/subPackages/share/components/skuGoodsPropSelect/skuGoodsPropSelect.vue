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
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
    .option-title {
      display: flex;
      font-size: 13px;
      color: #8e8e8e;
      margin-bottom: 3px;
    }
    .option-list {
      display: flex;
      flex-wrap: wrap;
      .option-list-item {
        display: flex;
        padding: 8px 10px;
        background: #fff;
        border: 1px solid #bbb;
        margin: 0px 10px 2px 0px;
        border-radius: 4px;
        font-size: 14px;
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
