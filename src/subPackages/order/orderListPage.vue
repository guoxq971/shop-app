<template>
  <!--    状态栏及导航栏盒子-->
  <view class="container van-safe-area-top van-safe-area-bottom">
    <statusBar></statusBar>
    <!--    导航栏-->
    <NavBar title="Order List" fixed left-text="Back" left-arrow @click-left="onClickLeft" />
    <view class="container-body">
      <Tabs class="body-tabs" v-model:active="param.status" @click-tab="onClickTab">
        <Tab title="unpaid" class="tabs-tab" name="1">
          <TabBox :list="list" @loadMore="loadMore" :loading="loading" :isMore="isMore"></TabBox>
        </Tab>
        <Tab title="Send" class="tabs-tab" name="2">
          <TabBox :list="list" @loadMore="loadMore" :isMore="isMore"></TabBox>
        </Tab>
        <Tab title="Receiving" class="tabs-tab" name="3">
          <TabBox :list="list" @loadMore="loadMore" :isMore="isMore"></TabBox>
        </Tab>
        <Tab title="Completed" class="tabs-tab" name="4">
          <TabBox :list="list" @loadMore="loadMore" :isMore="isMore"></TabBox>
        </Tab>
        <Tab title="Cancel" class="tabs-tab" name="-1">
          <TabBox :list="list" @loadMore="loadMore" :isMore="isMore"></TabBox>
        </Tab>
      </Tabs>
    </view>
  </view>
</template>

<script setup>
import { NavBar, Tab, Tabs } from 'vant';
import statusBar from '@/components/statusBar/statusBar.vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderList } from '@/api/order/order';
import { reactive, ref } from 'vue';
import TabBox from './components/tabBox.vue';

onLoad((options) => {
  param.status = options.status;
  getOrderList();
});

// 加载状态
const loading = ref(false);
// 是否加载更多
const isMore = ref(false);
// 总条数
const total = ref(0);
const param = reactive({
  pageNum: 1, // 分页
  pageSize: 10, // 页码
  status: '1', // 订单状态(1-待支付2-待发货3-待收货 4-已完成 -1-已取消)
});
const list = ref([]);
// 获取订单列表
const getOrderList = async () => {
  try {
    loading.value = true;
    const res = await orderList(param);
    res.data.records.forEach((item) => {
      if (item.orderItemVoList && item.orderItemVoList.length > 0) {
        item.orderItemVoList.forEach((detail) => {
          detail.productName = detail.prodName;
          detail.basketCount = detail.prodCount;
          detail.productSpec = detail.skuName;
        });
      } else {
        item.orderItemVoList = [];
      }
    });
    list.value = [...list.value, ...res.data.records];
    total.value = res.data.total;
    isMore.value = param.pageNum * param.pageSize < total.value;
  } finally {
    loading.value = false;
  }
};

// 加载更多
const loadMore = () => {
  param.pageNum += 1;
  getOrderList();
};

const onClickLeft = () => {
  uni.switchTab({
    url: '/pages/me/index',
  });
};

const onClickTab = (item) => {
  console.log(item);
  list.value = [];
  param.pageNum = 1;
  isMore.value = false;
  getOrderList();
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-body {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;

    .body-tabs {
      display: flex;
      flex-direction: column;
      height: 100%;

      .tabs-tab {
        height: 100%;
        overflow: auto;
        //background-color: #fbfbfb;
        background-color: #edeff6;
      }
    }
  }
}

:deep(.van-tabs__content) {
  height: 100%;
  overflow: hidden;
}
</style>
