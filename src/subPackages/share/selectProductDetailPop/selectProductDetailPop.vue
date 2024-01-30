<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '85%' }">
    <view class="select-product-container-bd">
      <view class="select-product-container">
        <!--颜色/风格-->
        <ColorStyleWrap :list="colorStyleList" v-model:active="activeStyleColor" type="col" />

        <GapWrap />

        <!--尺码列表-->
        <SizeListWrap :list="sizeList" v-model:active="activeSize" />

        <GapWrap :size="gapSize"></GapWrap>

        <!--数量-->
        <view>
          <view>Quantity</view>
          <view>
            <Stepper v-model="quantity"></Stepper>
          </view>
        </view>

        <GapWrap />

        <!--定制-->
        <CustomizationWrap
          v-model:front-name="customization.frontName"
          v-model:front-number="customization.frontNumber"
          v-model:back-name="customization.backName"
          v-model:back-number="customization.backNumber"
        />
      </view>

      <view class="tabbar-wrap">
        <view class="add-to-card">ADD TO CART</view>
      </view>
    </view>
  </Popup>
</template>

<script setup>
import { Popup, Stepper } from 'vant';
import { ref } from 'vue';
import ColorStyleWrap from '../colorStyleWrap/colorStyleWrap.vue';
import SizeListWrap from '../sizeListWrap/sizeListWrap.vue';
import GapWrap from '../gapWrap/gapWrap.vue';
import CustomizationWrap from '@/subPackages/share/customizationWrap/customizationWrap.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { tabBarHeightUnit } = useSystemInfo();
defineExpose({
  open: (param) => {
    // 尺码列表
    sizeList.value = param.sizeList;
    activeSize.value = param.activeSize;
    // color/style
    colorStyleList.value = param.colorStyleList;
    activeStyleColor.value = param.activeStyleColor;
    // 定制
    customization.value = param.customization;

    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});
const show = ref(false);
const quantity = ref(1);

const sizeList = ref([]);
const activeSize = ref('');

const colorStyleList = ref([]);
const activeStyleColor = ref('');

const customization = ref({
  frontName: '',
  frontNumber: '',
  backName: '',
  backNumber: '',
});
</script>

<style scoped lang="scss">
$tabbarHeight: v-bind(tabBarHeightUnit);
.select-product-container-bd {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.select-product-container {
  padding: 20rpx 20rpx;
  height: calc(100% - $tabbarHeight);
  overflow: auto;
}
.tabbar-wrap {
  display: flex;
  align-items: center;
  height: $tabbarHeight;
  padding: 20rpx;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 2rpx solid #bbb;
  .add-to-card {
    width: 80%;
    height: 80rpx;
    border: 2rpx solid;
    font-size: 28rpx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
