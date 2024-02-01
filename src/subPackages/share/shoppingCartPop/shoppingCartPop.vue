<!--购物车弹窗-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '85%' }">
    <view class="container">
      <view class="container-body">
        <!--购物车列表-->
        <cartListPage></cartListPage>
      </view>
      <!--支付&统计-->
      <TotalPayment isCheckBox></TotalPayment>
    </view>
  </Popup>
</template>

<script setup>
import { Popup } from 'vant';
import { ref } from 'vue';
import cartListPage from '@/subPackages/cart/cartList.vue';
import TotalPayment from '@/subPackages/cart/TotalPayment.vue';

const show = ref(false);
defineExpose({
  open: (param) => {
    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100%);
}
.container-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-content: space-between;
  background-color: #edeff6;
}
</style>
