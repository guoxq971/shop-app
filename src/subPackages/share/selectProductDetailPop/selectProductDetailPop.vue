<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '85%' }">
    <view class="select-product-container-bd">
      <view class="select-product-container">
        <!--颜色/风格-->
        <ColorStyleWrap :list="styleList" v-model:active="activeStyle" type="col" />

        <GapWrap />

        <!--尺码列表-->
        <SizeListWrap :list="sizeList" v-model:active="activeSize" />

        <GapWrap />

        <!--数量-->
        <view class="quantity-wrap">
          <view class="title">Quantity</view>
          <view class="chunk-wrap">
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
        <view v-if="type === 'cart'" class="add-to-card" @click="onAddCart">ADD TO CART</view>
        <view v-if="type === 'buy'" class="add-to-card" @click="onBuy">BUY NOW</view>
      </view>
    </view>
  </Popup>
</template>

<script setup>
import { Popup, Stepper } from 'vant';
import { ref, watch } from 'vue';
import ColorStyleWrap from '../components/colorStyleWrap/colorStyleWrap.vue';
import SizeListWrap from '../components/sizeListWrap/sizeListWrap.vue';
import GapWrap from '../components/gapWrap/gapWrap.vue';
import CustomizationWrap from '@/subPackages/share/components/customizationWrap/customizationWrap.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { useCountStore } from '@/store/useCartTotalStore';
const { tabBarHeightUnit } = useSystemInfo();
const countStore = useCountStore();
defineExpose({
  open: (param) => {
    // 尺码列表
    sizeList.value = param.sizeList;
    activeSize.value = param.activeSize;
    // color/style
    styleList.value = param.colorStyleList;
    activeStyle.value = param.activeStyleColor;
    skuList.value = param.skuList;
    // 定制
    customization.value = param.customization;
    prodId.value = param.prodId;
    // 类型
    type.value = param.type;

    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});
const show = ref(false);
const type = ref('');
const prodId = ref('');
const quantity = ref(1);
const skuList = ref([]);
const sizeList = ref([]);
const activeSize = ref('');
const styleList = ref([]);
const activeStyle = ref('');
watch(activeSize, (val) => {
  if (val === '') {
    styleList.value.forEach((e) => {
      e.disabled = false;
    });
    return;
  }
  // size.name = 当前选中的尺码
  const size = sizeList.value.find((e) => e.id === val);
  if (!size) return;
  // 如果skuList中存在当前选中的尺码, 则找出当前选中尺码对应的颜色
  const colorList = skuList.value.filter((e) => e.size === size.name).map((e) => e.color);
  // styleList中不存在colorList的颜色, 则将其disabled
  styleList.value.forEach((e) => {
    e.disabled = !colorList.includes(e.name);
  });
});
watch(activeStyle, (val) => {
  if (val === '') {
    sizeList.value.forEach((e) => {
      e.disabled = false;
    });
    return;
  }
  // style.name = 当前选中的颜色
  const style = styleList.value.find((e) => e.id === val);
  if (!style) return;
  // 如果skuList中存在当前选中的颜色, 则找出当前选中颜色对应的尺码
  const c_sizeList = skuList.value.filter((e) => e.color === style.name).map((e) => e.size);
  // sizeList中不存在sizeList的尺码, 则将其disabled
  sizeList.value.forEach((e) => {
    e.disabled = !c_sizeList.includes(e.name);
  });
});

const customization = ref({
  frontName: '',
  frontNumber: '',
  backName: '',
  backNumber: '',
});

// 添加到购物车
function onAddCart() {
  const size = sizeList.value.find((e) => e.id === activeSize.value);
  const style = styleList.value.find((e) => e.id === activeStyle.value);
  const sku = skuList.value.find((e) => e.size === size?.name && e.color === style?.name);
  // console.log('sku', sku, sku.value);
  if (!sku) {
    return;
  }
  // TODO:添加购物车报错
  countStore.addCart({
    count: quantity.value, // 产品数量
    prodId: prodId.value, // 产品id
    skuId: sku.skuId, // skuId
  });
}
// 购买
function onBuy() {}
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

// 数量
.quantity-wrap {
  .title {
    font-weight: bold;
    font-size: 28rpx;
  }
  .chunk-wrap {
    padding: 10rpx 0 0 0;
  }
}
</style>
