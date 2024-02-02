<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '85%' }" @close="close">
    <view class="select-product-container-bd">
      <view class="select-product-container">
        <SkuGoodsPropSelect :specList="specList" :selectSpec="selectSpec" :changeSpec="changeSpec" />

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
import { Popup, Stepper, showToast } from 'vant';
import { ref, watch } from 'vue';
import GapWrap from '../components/gapWrap/gapWrap.vue';
import CustomizationWrap from '@/subPackages/share/components/customizationWrap/customizationWrap.vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { useCountStore } from '@/store/useCartTotalStore';
import SkuGoodsPropSelect from '@/subPackages/share/components/skuGoodsPropSelect/skuGoodsPropSelect.vue';
import { useSkuSelect } from '@/hooks/useSkuSelect/useSkuSelect';
const { tabBarHeightUnit } = useSystemInfo();
const countStore = useCountStore();
const emit = defineEmits(['emitSelectSpec']);
const { changeSpec, specList, selectSpec, dataInit, setSelectSpec, getSkuInfo } = useSkuSelect();
defineExpose({
  open: (param) => {
    dataInit(param.mData);
    setSelectSpec(param.selectSpec);

    // 定制
    customization.value = param.customization;
    prodId.value = param.prodId;
    // 类型
    type.value = param.type;

    show.value = true;
  },
  close,
});

function close() {
  emit('emitSelectSpec', selectSpec.value);
  show.value = false;
}

const show = ref(false);
const type = ref('');
const prodId = ref('');
const quantity = ref(1);

const customization = ref({
  frontName: '',
  frontNumber: '',
  backName: '',
  backNumber: '',
});

// 添加到购物车
function onAddCart() {
  const sku = getSkuInfo(selectSpec.value);
  if (!sku) {
    console.log('123');
    showToast({
      message: 'Please select the product information',
      duration: 2000,
    });

    return;
  }
  countStore
    .addCart({
      count: quantity.value, // 产品数量
      prodId: prodId.value, // 产品id
      skuId: sku.id, // skuId
    })
    .then((res) => {
      showToast({
        message: 'Add to cart successfully',
        duration: 2000,
      });
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
