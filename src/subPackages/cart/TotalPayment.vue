<template>
  <view class="footer">
    <view class="footer-box">
      <view>
        <Checkbox v-if="isCheckBox" shape="round" v-model="checkAll" @change="changeAll">Choose All</Checkbox>
      </view>

      <view class="footer-right">
        <view class="footer-total" v-if="price">
          <view>Total: ${{ price }}</view>
          <view>{{ label }}</view>
        </view>
        <Button @click="checkAddress">Checkout</Button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { Button, Checkbox } from 'vant';
import { ref } from 'vue';
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
  emit('changeAll', value);
};
</script>

<style scoped lang="scss">
.footer {
  margin-top: 2rpx;
  padding: 10rpx;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 2rpx solid #a1a2a4;
  height: calc(110rpx + env(safe-area-inset-bottom));

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
    }
  }
}
</style>
