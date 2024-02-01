<!--首页 - 分类 - 左侧弹窗-->
<template>
  <Popup style="width: 80%" v-model:show="show" position="left" @close="close" @open="open">
    <view class="category-container">
      <bmNavbar>
        <template #left>
          <view @click="close">
            <Icon name="arrow-left"></Icon>
            <text>Back</text>
          </view>
        </template>
      </bmNavbar>

      <!--列表-->
      <view class="list-wrap">
        <view class="item-wrap" v-for="item in list" :key="item.id">
          <view class="item-title">{{ item.label }}</view>
          <view class="item-list">
            <view @click="onClick(item2)" v-for="item2 in item.list" :key="item2.id" class="box">
              <bmBox width="80%">
                <VanImage class="image-wrap" :src="$basePathImg + item2.url" />
              </bmBox>
              <view class="name">{{ item2.name }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </Popup>
</template>

<script setup>
import { Popup, Icon, Image as VanImage } from 'vant';
import { ref, defineExpose } from 'vue';
import { randomImage, uuid } from '@/utils/commom';
import bmBox from '@/components/bm/box/box.vue';
import bmNavbar from '@/subPackages/share/navbar.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { getCategoryListApi, getCategoryListSecondApi } from '@/api/share/share';

// 获取分类列表
const loading = ref(false);
async function getCategoryList() {
  try {
    loading.value = true;
    // 获取一级分类
    const oneRes = await getCategoryListApi({ categoryType: 0 });
    // console.log('获取一级分类', oneRes.data);
    list.value = oneRes.data.map((e) => {
      return {
        detail: e,
        id: e.categoryId,
        label: e.categoryName,
        list: [],
      };
    });

    // 获取二级分类
    const twoRes = await getCategoryListSecondApi({ categoryType: 0 });
    // console.log('获取二级分类', twoRes);
    for (let item of twoRes.data) {
      const d = list.value.find((e) => e.id === item.parentId);
      if (!d) continue;
      d.list.push({
        detail: item,
        id: item.categoryId,
        name: item.categoryName,
        url: item.pic,
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

onShow(() => {
  getCategoryList();
});

defineExpose({
  open,
  close,
});
const show = ref(false);
function open() {
  show.value = true;
}
function close() {
  show.value = false;
}

// 选择
function onClick(item) {
  uni.navigateTo({
    url: `/subPackages/share/themeSelected/index?name=${item.name}&id=${item.id}`,
  });
}

// 输入框内容
const value = ref('');
const placeholder = ref('MLB、NBA');

// 分类
const list = ref([
  // {
  //   label: 'Sports',
  //   id: uuid(),
  //   list: [
  //     { id: uuid(), name: 'Baseball', url: randomImage() },
  //     { id: uuid(), name: 'Football', url: randomImage() },
  //     { id: uuid(), name: 'Basketball', url: randomImage() },
  //     { id: uuid(), name: 'Hockey', url: randomImage() },
  //     { id: uuid(), name: 'Soccer', url: randomImage() },
  //     { id: uuid(), name: 'Softball', url: randomImage() },
  //   ],
  // },
  // {
  //   label: 'Category',
  //   id: uuid(),
  //   list: [
  //     { id: uuid(), name: 'Sweatshirts', url: randomImage() },
  //     { id: uuid(), name: 'T-shirt', url: randomImage() },
  //     { id: uuid(), name: 'Polos', url: randomImage() },
  //     { id: uuid(), name: 'Jacket', url: randomImage() },
  //     { id: uuid(), name: 'Shorts', url: randomImage() },
  //     { id: uuid(), name: 'Pants', url: randomImage() },
  //     { id: uuid(), name: 'Hats', url: randomImage() },
  //   ],
  // },
  // {
  //   label: 'Category',
  //   id: uuid(),
  //   list: [
  //     { id: uuid(), name: 'Patriotic', url: randomImage() },
  //     { id: uuid(), name: 'supportive', url: randomImage() },
  //     { id: uuid(), name: 'specials', url: randomImage() },
  //   ],
  // },
  // {
  //   label: 'Category',
  //   id: uuid(),
  //   list: [
  //     { id: uuid(), name: 'Patriotic', url: randomImage() },
  //     { id: uuid(), name: 'supportive', url: randomImage() },
  //     { id: uuid(), name: 'specials', url: randomImage() },
  //   ],
  // },
]);
</script>

<style scoped lang="scss">
.category-container {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
// 列表
.list-wrap {
  padding: 40rpx 24rpx 28rpx 24rpx;
  overflow: auto;

  .item-wrap {
    /* 将边框变成 透明 */
    border-bottom: 2rpx solid transparent;
    /* 从上到下 蓝色到绿色  然后将蓝色变成透明色*/
    border-image: linear-gradient(to bottom, transparent 50%, #cfcfcf 50%) 0 0 100% 0;
    padding-bottom: 12rpx;
    margin-top: 24rpx;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      border-bottom: none;
    }

    .item-title {
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }

    .item-list {
      display: flex;
      flex-wrap: wrap;

      .box {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20rpx;

        .image-wrap {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 2rpx solid #f2f2f2;
        }

        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26rpx;
          margin-top: 12rpx;
        }
      }
    }
  }
}
</style>
