<!--状态栏 和 导航栏-->
<template>
  <view :style="{ height: statusHeight + 'px', backgroundColor: bgColor }" />
  <view :style="{ height: navBarHeight + 'px' }"></view>
</template>

<script setup>
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { statusHeight, navBarHeight } = useSystemInfo();
defineProps({
  bgColor: {
    type: String,
    default: '#fff',
  },
});
</script>

<style scoped lang="scss"></style>
