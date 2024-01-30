<!--选择产品信息-->
<template>
  <Popup v-model:show="show" position="bottom" :style="{ height: '70%' }">
    <view>选择产品信息</view>
  </Popup>
</template>

<script setup>
import { Popup } from 'vant';
import { ref } from 'vue';
const show = ref(false);
</script>

<style scoped lang="scss"></style>
