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
            <view style="flex: 1">
              <Cell :title="expressInfo.name" :value="expressInfo.expressFee" :border="false" :label="expressInfo.label" center is-link @click="showPopup('delivery')">
                <template #value>
                  <view v-if="expressInfo.expressFee" style="display: flex; align-items: center; justify-content: flex-end">
                    <Price :price="expressInfo.expressFee" color="#969799"></Price>
                  </view>
                </template>
              </Cell>
              <view v-if="!expressTip" style="color: #ee0a24; font-size: 24rpx; text-align: left">Delivery service</view>
            </view>
          </view>
          <view class="service-note">Order note</view>
          <Field class="f-border" v-model="expressInfo.remark" type="textarea" autosize rows="2"></Field>
        </CellGroup>
      </Form>
    </view>
    <TotalPayment @checkOut="checkOut"></TotalPayment>
  </view>
  <Popup v-model:show="showPicker" round position="bottom">
    <Picker v-model="region" :title="pTitle" @confirm="onConfirm" @click-option="onConfirm" :columns="columns" @cancel="showPicker = false">
      <template #option="item">
        <view class="option">
          <view>
            <view>{{ item.name }}</view>
            <view v-if="item.label" class="option-label">({{ item.label }})</view>
          </view>
          <Price :price="item.expressFee" color="#969799"></Price>
        </view>
      </template>
    </Picker>
  </Popup>
</template>

<script setup>
import { NavBar, Form, Field, CellGroup, Picker, Popup, Cell } from 'vant';
import statusBar from '@/components/statusBar/statusBar.vue';
import { ref, reactive, onMounted } from 'vue';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { infoAddress, addAddress, updateAddress, listExpressByProdList } from '@/api/cart/address';
import TotalPayment from './TotalPayment.vue';
import { useCountStore } from '@/store/useCartTotalStore';
import Price from '@/components/price/index.vue';
import { useOrderExpress } from '@/store/useOrderExpress';
import { storeToRefs } from 'pinia';
const { statusHeight, statusHeightUnit } = useSystemInfo();
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
    if (res.data.addressId) expressInfo.value.addressId = res.data.addressId;
  }
};

const { expressInfo } = storeToRefs(useOrderExpress());

const deliveryList = ref([]);
const store = useCountStore();
// 根据产品id获取物流信息
const getExpressList = async () => {
  const productList = store.getCartListById();
  const ids = productList.map((item) => item.prodId);
  const res = await listExpressByProdList(ids);
  const list = [];
  if (res) {
    res?.data.forEach((item) => {
      list.push({
        seqId: item.seqId, // 快递主键
        value: item.seqId,
        name: item.name, // 快递名称
        expressFee: item.expressFee, // 快递运费
        transfeeId: item.transfeeId, // 运费表id
        label: 'About 10 days',
      });
    });
    deliveryList.value = list;
  }
};

const regionList = ref([
  { name: 'America', value: 'us' },
  { name: 'Canada', value: 'ca' },
]);

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
    columns.value = regionList.value;
  } else {
    pTitle.value = 'Delivery service';
    columns.value = deliveryList.value;
    region.value = expressInfo.seqId ? [expressInfo.seqId] : [];
  }
  showPicker.value = true;
};

const expressTip = ref(true);
const onConfirm = (data) => {
  if (pTitle.value === 'Country/Region') {
    formData.countryId = data.selectedOptions[0].text;
  } else {
    Object.keys(expressInfo.value).forEach((key) => {
      if (!['remark', 'addressId'].includes(key)) {
        expressInfo.value[key] = data.selectedOptions[0][key];
      }
    });
    expressTip.value = !!expressInfo.value.seqId;
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
  expressTip.value = !!expressInfo.value.seqId;
  ruleForm.value.submit();
};

const onSubmit = async () => {
  let res = '';
  if (!expressTip.value) return;
  if (formData.addressId) {
    res = await updateAddress(formData);
  } else {
    const obj = {};
    Object.keys(formData).forEach((key) => (obj[key] = formData[key]));
    res = await addAddress(formData);
    if (res) {
      expressInfo.value.addressId = res.data;
    }
  }
  if (res) {
    uni.navigateTo({
      url: '/subPackages/cart/CheckOut',
    });
  }
};
onMounted(() => {
  getAddressInfo();
  getExpressList();
  Object.keys(expressInfo.value).forEach((key) => {
    expressInfo.value[key] = '';
  });
});
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

      .group-row {
        display: flex;
      }

      .group-service {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #e5e5e5;

        .service-title {
          width: 40%;
        }
      }
      .service-note {
        margin: 16rpx 0;
      }
    }
  }
}

.option {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 40rpx;
}
.option-label {
  color: #969799;
  font-size: 28rpx;
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
