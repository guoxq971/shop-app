<!--地址信息-->
<template>
  <view class="container">
<!--    状态栏-->
    <view :style="{height:statusHeight + 'px'}" />
<!--    导航栏-->
    <NavBar title="Confirm the Order"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft" />
    <view class="container-body">
      <Form>
        <CellGroup inset>
          <view>Shipping Address</view>
          <Row>
            <Col :span="10"> <Field v-model="formData.firstName" placeholder="请输入用户名"></Field></Col>
            <Col :span="10"> <Field v-model="formData.lastName"  placeholder="请输入用户名"></Field></Col>
          </Row>


        </CellGroup>
        <CellGroup inset>
          <view>Shipping Address</view>
          <Field></Field>
          <Field></Field>
        </CellGroup>
      </Form>
    </view>
    <view class="container-footer">底部</view>
  </view>

</template>

<script setup>
import {NavBar, Form, Field, CellGroup,Col, Row } from 'vant';

import{ref,reactive} from 'vue'
import {useSystemInfo} from '@/hooks/useSystemInfo'
const { statusHeight } = useSystemInfo()

const formData = reactive({
  firstName: '',
  lastName: ''
})

const onClickLeft = () => {
 uni.navigateBack({
   delta: 1
 })
}

</script>



<style scoped lang="scss">

.container{
  height: 100vh;
  display: flex;
  flex-direction: column;


  .container-body{
    padding: 16rpx 0;
    border: 1px solid red;
    flex: 1;
    overflow: auto;
    background-color: #edeff6;
  }

  .container-footer{

  }
}

:deep(.van-cell-group--inset) {
  margin: 0 16rpx;
}

.border{
  border: 2rpx solid #e5e5e5;
}

</style>