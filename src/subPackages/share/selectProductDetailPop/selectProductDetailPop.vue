<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '80%' }">
    <view>
      <ColorStyleWrap :list="colorStyleList" :active="activeStyleColor" type="col" />
    </view>
  </Popup>
</template>

<script setup>
import { Popup } from 'vant';
import { ref } from 'vue';
import ColorStyleWrap from '../colorStyleWrap/colorStyleWrap.vue';
defineExpose({
  open: (param) => {
    colorStyleList.value = param.colorStyleList;
    activeStyleColor.value = param.activeStyleColor;
    show.value = true;
  },
  close: () => {
    show.value = false;
  },
});

const show = ref(false);
const colorStyleList = ref([]);
const activeStyleColor = ref('');
</script>

<style scoped lang="scss"></style>
