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
                      <VanImage class="image" :src="$basePathImg + item.url"></VanImage>
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
import { onLoad, onShow } from '@dcloudio/uni-app';
import bmBox from '@/components/bm/box/box.vue';
import { TreeSelect, Tab, Tabs } from 'vant';
import { ref, onMounted } from 'vue';
import { Icon, Image as VanImage } from 'vant';
import { randomImage, randomWord, uuid } from '@/utils/commom';
import { getCategoryListApi, getCategoryListPartSecondApi, getCategoryListSecondApi } from '@/api/share/share';

// 返回上一级
function onBack() {
  const pages = getCurrentPages();
  if (pages.length === 1) {
    uni.switchTab({ url: '/pages/share/index' });
  } else {
    uni.navigateBack();
  }
}

// 选择跳转到这个页面的分类名称
const name = ref('');
const id = ref('');
onLoad((e) => {
  name.value = e.name;
  id.value = e.id;
});

onShow(() => {
  getCategoryList();
});
// 获取分类列表
async function getCategoryList() {
  // 左侧菜单
  getCategoryListPartSecondApi({ categoryType: 0, parentId: id.value }).then((leftRes) => {
    // console.log('左侧菜单', leftRes);
    items.value = leftRes.data.map((e) => {
      return {
        detail: e,
        id: e.categoryId,
        url: e.pic,
        text: e.categoryName,
      };
    });
  });

  // 右侧顶部菜单
  getCategoryListApi({ categoryType: 1 }).then((rightRes) => {
    // console.log('右侧顶部菜单', rightRes);
    tabsList.value = rightRes.data.map((e) => {
      return {
        detail: e,
        label: e.categoryName,
        value: e.categoryName,
      };
    });
    if (tabsList.value.length) {
      activeName.value = tabsList.value[0].value;
    }
  });

  // 右侧列表
  getCategoryListSecondApi({ categoryType: 1 }).then((rightListRes) => {
    // console.log('右侧列表', rightListRes);
    list.value = rightListRes.data.map((e) => {
      return {
        detail: e,
        id: e.categoryId,
        name: e.categoryName,
        url: e.pic,
      };
    });
  });
}

// 左侧导航
const activeIndex = ref(0);
const items = ref([
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
  // { id: uuid(), url: randomImage(), text: randomWord() },
]);

// 右侧选项卡
const activeName = ref('');
const tabsList = ref([
  // { label: 'Color', value: 'color' },
  // { label: 'Style', value: 'style' },
  // { label: 'Holiday', value: 'holiday' },
]);
const list = ref([
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
  // { id: uuid(), url: randomImage(), name: randomWord() },
]);
// 选择某个主题
function onClick(item) {
  uni.navigateTo({
    url: `/subPackages/share/productList/index?categoryName=${name.value}&tagName=${item.name}&categoryId=${item.id}`,
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
      padding: 28rpx 10px;

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
