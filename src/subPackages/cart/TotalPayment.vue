<template>
  <view class="footer">
    <view class="footer-box">
      <view>
        <Checkbox v-if="isCheckBox" shape="round" v-model="checkAll" @change="changeAll">Choose All</Checkbox>
      </view>

      <view class="footer-right">
        <view class="footer-total" v-if="store.cartTotal.finalMoney">
          <view class="total-money">
            <text class="m-r4">Total:</text>
            <view class="money-info t-red">
              <sub class="m-r4">$</sub>
              <text>{{ store.cartTotal.finalMoney }}</text>
            </view>
          </view>
          <view class="total-money">
            <text class="m-r4">discounts:</text>
            <view class="money-info t-red">
              <sub class="m-r4">$</sub>
              <text>{{ store.cartTotal.subtractMoney }}</text>
            </view>
          </view>
        </view>
        <Button @click="checkAddress" type="danger">Checkout</Button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { Button, Checkbox } from 'vant';
import { useCountStore } from '@/store/useCartTotalStore';
import { ref } from 'vue';

const store = useCountStore();

const checkAll = ref(false);
defineProps({
  // 是否需要Choose All复选框
  isCheckBox: { type: Boolean, default: false },
  price: {
    type: String,
    default: '222',
  },
  label: {
    type: String,
    default: 'xxxxxxxxxxxxxxxx',
  },
});

const emit = defineEmits(['checkOut', 'changeAll']);

const checkAddress = () => {
  emit('checkOut');
};

const changeAll = (value) => {
  store.checkAllList(value);
  emit('changeAll', value);
};
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  margin-top: 2rpx;
  padding: 10rpx;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 2rpx solid #a1a2a4;
  height: 100rpx;

  .footer-box {
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-right {
      display: flex;
    }

    .footer-total {
      display: flex;
      flex-direction: column;
      text-align: right;
      justify-content: space-between;
      margin-right: 10rpx;

      .total-money {
        display: flex;

        .money-info {
          display: flex;
          align-items: baseline;
        }
      }
    }
  }
}

.t-red {
  color: #ff4400;
}

.gary {
  color: #969799;
}
.m-r4 {
  margin-right: 4rpx;
}
</style>
