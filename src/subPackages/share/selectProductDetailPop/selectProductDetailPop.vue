<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '85%' }">
    <view>
      <!--颜色/风格-->
      <ColorStyleWrap :list="colorStyleList" v-model:active="activeStyleColor" type="col" />

      <!--尺码列表-->
      <sizeListWrap :list="sizeList" v-model:active="activeSize" />
    </view>
  </Popup>
</template>

<script setup>
import { Popup } from 'vant';
import { ref } from 'vue';
import ColorStyleWrap from '../colorStyleWrap/colorStyleWrap.vue';
import sizeListWrap from '../sizeListWrap/sizeListWrap.vue';
defineExpose({
  open: (param) => {
    // 尺码列表
    sizeList.value = param.sizeList;
    activeSize.value = param.activeSize;
    // color/style
    colorStyleList.value = param.colorStyleList;
    activeStyleColor.value = param.activeStyleColor;
    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});

const show = ref(false);
const sizeList = ref([]);
const activeSize = ref('');

const colorStyleList = ref([]);
const activeStyleColor = ref('');
</script>

<style scoped lang="scss"></style>
