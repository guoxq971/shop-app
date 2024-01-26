<!--主题选择-->
<template>
  <view class="theme-container">
    <!--导航栏-->
    <bmNavbar>
      <template #left>
        <view @click="onBack">
          <Icon name="arrow-left"></Icon>
          <text>{{ name }}</text>
        </view>
      </template>
    </bmNavbar>

    <!--列表-->
    <view class="list-wrap">
      <TreeSelect v-model:main-active-index="activeIndex" height="100%" :items="items">
        <template #content>
          <Tabs v-model:active="activeName" sticky animated swipeable>
            <Tab v-for="item in tabsList" :key="item.value" :title="item.label" :name="item.value">
              <view class="box-group">
                <view @click="onClick(item)" class="box-wrap" v-for="item in list" :key="item.id">
                  <view class="name">{{ item.name }}</view>
                  <bmBox width="100%">
                    <view class="image-wrap">
                      <image class="image" :src="item.url"></image>
                    </view>
                  </bmBox>
                </view>
                <view class="box-wrap" v-for="item in 3" :key="'box-wrap' + item"></view>
              </view>
            </Tab>
          </Tabs>
        </template>
      </TreeSelect>
    </view>
  </view>
</template>

<script setup>
import bmNavbar from '@/subPackages/share/navbar.vue';
import { onLoad } from '@dcloudio/uni-app';
import bmBox from '@/components/bm/box/box.vue';
import { TreeSelect, Tab, Tabs } from 'vant';
import { ref } from 'vue';
import { Icon } from 'vant';
import { randomImage, randomWord, uuid } from '@/utils/commom';

// 选择跳转到这个页面的分类名称
const name = ref('');
onLoad((e) => {
  name.value = e.name;
});

// 返回上一级
function onBack() {
  const pages = getCurrentPages();
  if (pages.length === 1) {
    uni.switchTab({ url: '/pages/share/index' });
  } else {
    uni.navigateBack();
  }
}

// 左侧导航
const activeIndex = ref(0);
const items = ref([
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
  { id: uuid(), url: randomImage(), text: randomWord() },
]);

// 右侧选项卡
const activeName = ref('color');
const tabsList = [
  { label: 'Color', value: 'color' },
  { label: 'Style', value: 'style' },
  { label: 'Holiday', value: 'holiday' },
];
const list = ref([
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
  { id: uuid(), url: randomImage(), name: randomWord() },
]);
// 选择某个主题
function onClick(item) {
  uni.navigateTo({
    url: `/subPackages/share/productList/index?categoryName=${name.value}&tagName=${item.name}`,
  });
}
</script>

<style scoped lang="scss">
.theme-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .list-wrap {
    flex: 1;
    overflow: auto;

    :deep(.van-sidebar) {
      max-width: 180rpx;
    }

    :deep(.van-tabs) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    :deep(.van-tab__panel-wrapper) {
      overflow: auto;
    }

    .box-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 28rpx 16px;

      .box-wrap {
        width: 31.5%;
        margin-bottom: 14rpx;

        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8rpx 0;
        }

        .image-wrap {
          width: 100%;
          height: 100%;
          border-radius: 12rpx;
          overflow: hidden;
          border: 2rpx solid #f2f2f2;

          .image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
