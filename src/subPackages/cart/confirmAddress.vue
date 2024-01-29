<!--地址信息-->
<template>
  <view class="container">
    <!--    状态栏-->
    <view :style="{ height: statusHeight + 'px' }" />
    <!--    导航栏-->
    <NavBar title="Confirm the Order" left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <Form>
        <CellGroup inset class="f-group">
          <view class="group-title">Shipping Address</view>
          <view class="group-row">
            <Field v-model="formData.firstName" class="f-border m-r10" placeholder="First Name*" :rules="[{ required: true, message: 'First Name' }]"></Field>
            <Field v-model="formData.lastName" placeholder="Last Name*" class="f-border" :rules="[{ required: true, message: 'First Name' }]"></Field>
          </view>
          <Field v-model="formData.lastName" placeholder="Email*" class="f-border" :rules="[{ required: true, message: 'Email' }]"></Field>
          <Field v-model="formData.lastName" placeholder="Phone*" class="f-border" :rules="[{ required: true, message: 'Phone' }]"></Field>
          <Field v-model="formData.lastName" placeholder="Address 1*" class="f-border" :rules="[{ required: true, message: 'Address 1' }]"></Field>
          <Field v-model="formData.lastName" placeholder="Address 2(Apt,Unit,Etc)" class="f-border" :rules="[{ required: true, message: 'Address 2(Apt,Unit,Etc)' }]"></Field>
          <Field
            v-model="formData.region"
            is-link
            readonly
            name="picker"
            @click="showPopup('region')"
            placeholder="Choose a Country/Region"
            class="f-border"
            :rules="[{ required: true, message: 'Choose a Country/Region' }]"
          ></Field>
          <Field v-model="formData.lastName" placeholder="Postal Code*" class="f-border" :rules="[{ required: true, message: 'Choose a Country/Region' }]"></Field>
          <Field v-model="formData.lastName" placeholder="Citity*" class="f-border" :rules="[{ required: true, message: 'Citity' }]"></Field>
          <Field v-model="formData.lastName" placeholder="State/Province/Territory*" class="f-border" :rules="[{ required: true, message: 'State/Province/Territory' }]"></Field>
        </CellGroup>
        <CellGroup class="f-group" inset>
          <view class="group-service">
            <view class="service-title">Delivery service</view>
            <Cell :title="service.text" :value="service.price" :label="service.label" center is-link @click="showPopup('delivery')">
              <template #value>
                <!--                style="display: flex; align-items: flex-end; justify-content: flex-end; font-size: 36rpx"-->
                <view v-if="service.price" style="display: flex; align-items: baseline; justify-content: flex-end">
                  <sub style="font-size: 24rpx; margin-right: 6rpx">$</sub>
                  <text style="font-weight: 700; font-size: 36rpx">{{ service.price }}</text>
                </view>
              </template>
            </Cell>
          </view>
          <view class="service-note">Order note</view>
          <Field class="f-border" v-model="formData.note" type="textarea" autosize rows="2"></Field>
        </CellGroup>
      </Form>
    </view>
    <TotalPayment @checkOut="checkOut"></TotalPayment>
  </view>
  <Popup v-model:show="showPicker" round position="bottom">
    <Picker v-model="region" :title="pTitle" @confirm="onConfirm" @click-option="onConfirm" :columns="columns" @cancel="showPicker = false">
      <template #option="item">{{ item.text }} - {{ item.label }}</template>
    </Picker>
  </Popup>
</template>

<script setup>
import { NavBar, Form, Field, CellGroup, Picker, Popup, Cell } from 'vant';

import { ref, reactive } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { statusHeight } = useSystemInfo();
import TotalPayment from './TotalPayment.vue';

const formData = reactive({
  firstName: '',
  lastName: '',
  region: '',
  note: '',
});

let service = reactive({
  price: '',
  text: '',
  label: '',
});

const regionList = [
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
];

const deliveryList = [
  { text: 'USPS', value: '1', label: 'About 10 days', price: '200' },
  { text: 'DHL', value: '2', label: 'About 20 days', price: '100' },
  { text: 'PHL', value: '3', label: 'About 15 days', price: '100' },
];

const columns = ref([]);

// 弹出层的标题
const pTitle = ref('');
// 弹出层默认选择的项
const region = ref([]);
const showPicker = ref(false);
// 弹出层类型
const pType = ref('');

const showPopup = (type) => {
  region.value = [];
  pType.value = type;
  if (type === 'region') {
    pTitle.value = 'Country/Region';
    columns.value = regionList;
  } else {
    pTitle.value = 'Delivery service';
    columns.value = deliveryList;
  }
  showPicker.value = true;
};

const onConfirm = (data) => {
  if (pTitle.value === 'onConfirm') {
    formData.region = data.selectedOptions[0].text;
  } else {
    Object.keys(service).forEach((key) => {
      service[key] = data.selectedOptions[0][key];
    });
  }
  showPicker.value = false;
};

const onClickLeft = () => {
  uni.switchTab({
    url: '/pages/cart/index',
  });
};

const checkOut = () => {
  uni.navigateTo({
    url: '/subPackages/cart/CheckOut',
  });
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-body {
    padding: 16rpx 0;
    flex: 1;
    overflow: auto;
    background-color: #edeff6;

    .f-group {
      padding: 16rpx 16rpx 0;
      margin-bottom: 16rpx;

      .group-title {
        margin-bottom: 16rpx;
        font-size: 36rpx;
      }

      .group-row,
      .group-service {
        display: flex;
      }

      .group-service {
        width: 100%;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #e5e5e5;

        .service-title {
          width: 75%;
        }
      }
      .service-note {
        margin: 16rpx 0;
      }
    }
  }
}

:deep(.van-cell-group--inset) {
  margin: 0 16rpx;
}

.f-border {
  border: 2rpx solid #e5e5e5;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
}

:deep(.van-cell) {
  padding: 10rpx;
}

.m-r10 {
  margin-right: 10rpx;
}

.m-b10 {
  margin-right: 10rpx;
}
</style>
