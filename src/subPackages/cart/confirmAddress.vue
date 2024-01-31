<!--地址信息-->
<template>
  <view class="container">
    <!--    状态栏及导航栏盒子-->
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar title="Confirm the Order" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <Form ref="ruleForm" @submit="onSubmit">
        <CellGroup inset class="f-group">
          <view class="group-title">Shipping Address</view>
          <view class="group-row">
            <Field v-model="formData.firstName" class="f-border m-r10" placeholder="First Name*" :rules="[{ required: true, message: 'First Name' }]"></Field>
            <Field v-model="formData.lastName" placeholder="Last Name*" class="f-border" :rules="[{ required: true, message: 'First Name' }]"></Field>
          </view>
          <Field v-model="formData.email" placeholder="Email*" class="f-border" :rules="[{ required: true, message: 'Email' }]"></Field>
          <Field v-model="formData.phone" placeholder="Phone*" class="f-border" :rules="[{ required: true, message: 'Phone' }]"></Field>
          <Field v-model="formData.address" placeholder="Address 1*" class="f-border" :rules="[{ required: true, message: 'Address 1' }]"></Field>
          <Field v-model="formData.addressTwo" placeholder="Address 2(Apt,Unit,Etc)" class="f-border" :rules="[{ required: true, message: 'Address 2(Apt,Unit,Etc)' }]"></Field>
          <Field
            v-model="formData.countryId"
            is-link
            readonly
            name="picker"
            @click="showPopup('countryId')"
            placeholder="Choose a Country/Region"
            class="f-border"
            :rules="[{ required: true, message: 'Choose a Country/Region' }]"
          ></Field>
          <Field v-model="formData.postalCode" placeholder="Postal Code*" class="f-border" :rules="[{ required: true, message: 'Choose a Country/Region' }]"></Field>
          <Field v-model="formData.city" placeholder="Citity*" class="f-border" :rules="[{ required: true, message: 'Citity' }]"></Field>
          <Field v-model="formData.state" placeholder="State/Province/Territory*" class="f-border" :rules="[{ required: true, message: 'State/Province/Territory' }]"></Field>
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
import statusBar from '@/components/statusBar/statusBar.vue';
import { ref, reactive } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { infoAddress, addAddress, updateAddress } from '@/api/cart/address';

const { statusHeight, statusHeightUnit } = useSystemInfo();
import TotalPayment from './TotalPayment.vue';

const formData = reactive({
  addressId: '', // 地址id
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
// 获取地址信息
const getAddressInfo = async () => {
  const res = await infoAddress();
  if (res.data) {
    Object.keys(formData).forEach((key) => (formData[key] = res.data[key]));
  }
};

getAddressInfo();

let service = reactive({
  price: '',
  text: '',
  label: '',
});

const regionList = [
  { text: 'America', value: 'us' },
  { text: 'Canada', value: 'ca' },
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
  if (type === 'countryId') {
    pTitle.value = 'Country/Region';
    columns.value = regionList;
  } else {
    pTitle.value = 'Delivery service';
    columns.value = deliveryList;
  }
  showPicker.value = true;
};

const onConfirm = (data) => {
  if (pTitle.value === 'Country/Region') {
    formData.countryId = data.selectedOptions[0].text;
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

const ruleForm = ref(null);
const checkOut = () => {
  ruleForm.value.submit();
};

const onSubmit = async () => {
  let res = '';
  if (formData.addressId) {
    res = await updateAddress(formData);
  } else {
    const obj = {};
    Object.keys(formData).forEach((key) => (obj[key] = formData[key]));
    res = await addAddress(formData);
  }
  if (res) {
    uni.navigateTo({
      url: '/subPackages/cart/CheckOut',
    });
  }
};
</script>

<style scoped lang="scss">
:deep(.van-nav-bar--fixed) {
  top: v-bind(statusHeightUnit) !important;
}

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
