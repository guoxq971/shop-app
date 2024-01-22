<!--底部导航栏-->
<template>
  <u-tabbar :value="value" @change="change1" :fixed="true" :placeholder="false" :safeAreaInsetBottom="false">
    <u-tabbar-item name="index" text="首页" icon="home" @click="(e) => click1(e, 'index')"></u-tabbar-item>
    <u-tabbar-item name="category" text="分类" icon="photo" @click="(e) => click1(e, 'category')"></u-tabbar-item>
  </u-tabbar>
</template>

<script setup>
import { ref, watch } from 'vue';
import uTabbar from 'uview-plus/components/u-tabbar/u-tabbar.vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { useTabbarStore } from '@/store/useTabbarStore';
import { storeToRefs } from 'pinia';

const tabbarStore = useTabbarStore();
const { value } = storeToRefs(tabbarStore);

onShow(() => {
  // 根据当前路由设置value1
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  tabbarStore.setValue(url.split('/')[1]);
});

function click1(e, type) {
  const url = {
    index: '/pages/index/index',
    category: '/pages/category/index',
  }[type];
  uni.switchTab({
    url: url,
  });

  tabbarStore.setValue(type);
}
function change1(e) {
  // console.log('change1', e);
}
</script>

<style scoped lang="scss"></style>
