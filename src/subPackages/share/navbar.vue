<template>
  <NavBar fixed placeholder border>
    <template #title>
      <view class="bm-navbar">
        <slot name="left" v-if="$slots['left']"></slot>
        <view v-else class="left" @click="onCategory">分类</view>
        <Search class="ipt" v-model="value" shape="square" :placeholder="placeholder" :clearable="false" />
      </view>
    </template>
  </NavBar>

  <!--分类弹窗-->
  <categoryPop ref="categoryPopRef" />
</template>

<script setup>
import { NavBar, Search } from 'vant';
import categoryPop from '@/subPackages/share/categoryPop.vue';
import { ref, defineProps } from 'vue';

defineProps({});

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');

// 分类
const categoryPopRef = ref(null);
function onCategory() {
  categoryPopRef.value.open();
}
</script>

<style scoped lang="scss">
:deep(.van-nav-bar__title) {
  max-width: 100%;
  width: 100%;
  margin: unset;
}
:deep(.van-search) {
  padding: 0;
}

.bm-navbar {
  display: flex;
  align-items: center;
  padding: 0 16rpx;

  .left {
    width: 110rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2rpx solid #bbb;
    height: var(--van-search-input-height);
    font-weight: 500;
    font-size: 28rpx;
    border-radius: 6rpx;
  }
  .ipt {
    margin-left: 18rpx;
    flex: 1;
  }
}
</style>
