<template>
  <view class="container">
    <template v-if="payUrl">
      <!-- #ifdef H5 -->
      <iframe width="100%" height="100%" :src="payUrl" title="支付" />
      <!-- #endif -->
    </template>

    <template v-else>
      <!--    状态栏及导航栏盒子-->
      <statusBar></statusBar>
      <!--    导航栏-->
      <NavBar title="Confirm the Order" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
      <view class="container-body">
        <view class="body-info">
          <view class="title">订单信息</view>
          <view class="info-box">
            <productBox v-for="item in list" :key="item.uuid" :info="item"></productBox>
          </view>
        </view>
        <view class="body-address">
          <view class="title">地址信息</view>
          <view class="address-info">
            <view class="address-info-box">
              <view class="box-item">First Name:{{ addressInfo.firstName }}</view>
              <view class="box-item">Last Name:{{ addressInfo.lastName }}</view>
            </view>
            <view class="address-info-box">
              <view class="box-item">Email:{{ addressInfo.email }}</view>
              <view class="box-item">Phone:{{ addressInfo.phone }}</view>
            </view>
            <view class="address-info-box">
              <view class="box-item">Address 1:{{ addressInfo.address }}</view>
              <view class="box-item">Address 2:{{ addressInfo.addressTwo }}</view>
            </view>
            <view class="address-info-box">
              <view class="box-item">Country:{{ addressInfo.countryId }}</view>
              <view class="box-item">Postal Code:{{ addressInfo.postalCode }}</view>
            </view>
            <view class="address-info-box">
              <view class="box-item">Citity:{{ addressInfo.city }}</view>
              <view class="box-item">State/Province/Territory:{{ addressInfo.state }}</view>
            </view>
          </view>
        </view>
        <view class="body-button">
          <Button :type="payWay === 'PayPal' ? 'primary' : 'default'" size="small" @click="changeWay('PayPal')" class="m-r12">PayPal</Button>
          <Button :type="payWay === 'Apple' ? 'primary' : 'default'" @click="changeWay('Apple')" size="small">Apple Pay</Button>
        </view>
      </view>
      <TotalPayment @checkOut="checkOut"></TotalPayment>
    </template>
  </view>
</template>

<script setup>
import { NavBar, Button } from 'vant';
import { ref, onMounted, reactive } from 'vue';
import TotalPayment from './TotalPayment.vue';
import productBox from './components/productBox.vue';
import { useOrderExpress } from '@/store/useOrderExpress';
import { useCountStore } from '@/store/useCartTotalStore';
import { storeToRefs } from 'pinia';
import statusBar from '@/components/statusBar/statusBar.vue';
import { orderInfo, createOrder, paymentOrder } from '@/api/cart/payment';

const payUrl = ref('');
const countStore = useCountStore();
const checkOut = async () => {
  const obj = {
    addressId: originData.addressVo.addressId, // 地址id
    orderItemList: [],
    remark: originData.remark, // 备注
    expressId: originData.expressId, // 快递id
    transfeeId: originData.transfeeId, // 运费费用id
  };
  obj.orderItemList = list.value.map((item) => {
    return {
      prodId: item.prodId,
      skuId: item.skuId,
      productCount: item.productCount,
    };
  });
  // 创建订单
  const res = await createOrder(obj);
  if (res) {
    const pObj = {
      orderNumber: res.data,
    };
    // 支付
    const pRes = await paymentOrder(pObj);
    if (pRes) {
      payUrl.value = pRes.data;
      // await countStore.clearCart();
      // uni.navigateTo({
      //   url: '/subPackages/cart/paySuccess',
      // });
    } else {
      uni.navigateTo({
        url: '/subPackages/cart/payFail',
      });
    }
  }
};

const payWay = ref('PayPal');

const onClickLeft = () => {
  uni.navigateTo({
    url: '/subPackages/cart/confirmAddress',
  });
};

const changeWay = (type) => {
  payWay.value = type;
};

// 原始数据
let originData = {};
// 订单商品列表
const list = ref([]);

const { expressInfo } = storeToRefs(useOrderExpress());
const { checkboxValue } = storeToRefs(countStore);
let addressInfo = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '', // 手机号
  address: '', // 地址1
  addressTwo: '', // 地址2
  countryId: '', // 国家id
  postalCode: '', //
  city: '', //
  state: '',
});
const getOrderInfo = async () => {
  const obj = {
    addressId: expressInfo.value.addressId, // 地址id
    basketIdList: checkboxValue.value, // 地址id
    remark: expressInfo.value.remark, // 地址id
    expressId: expressInfo.value.seqId, // 快递id
    transfeeId: expressInfo.value.transfeeId, // 快递运费id
  };
  const res = await orderInfo(obj);
  if (res) {
    res.data.itemList.forEach((item) => {
      item.basketCount = item.productCount;
      item.price = item.productPrice;
    });
    list.value = res.data.itemList;
    Object.keys(addressInfo).forEach((key) => {
      addressInfo[key] = res.data.addressVo[key];
    });
    originData = res.data;
  }
};

onMounted(() => {
  getOrderInfo();
});
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-body {
    padding: 16rpx;
    flex: 1;
    overflow: hidden;
    background-color: #edeff6;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      padding: 16rpx;
      border-bottom: 2rpx solid #e4e4e4;
    }

    .body-info {
      margin-bottom: 16rpx;
      border-radius: 8rpx;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      background-color: #ffffff;

      .info-box {
        flex: 1;
        overflow: auto;
      }
    }

    .body-address {
      background-color: #ffffff;
      margin-bottom: 16rpx;
      border-radius: 8rpx;
      //height: 300rpx;
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .address-info {
        flex: 1;
        overflow: auto;
        padding: 0 16rpx;

        .address-info-box {
          padding: 16rpx 0;
          display: flex;
          //border-bottom: 2rpx solid #e4e4e4;
          font-size: 28rpx;
          color: #969799;

          .box-item {
            width: 50%;
          }
        }
      }
    }

    .body-button {
      padding: 10rpx;
      background-color: #ffffff;
    }
  }
}

.m-r12 {
  margin-right: 12rpx;
}
</style>
