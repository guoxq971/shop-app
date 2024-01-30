<!--状态栏-->
<template>
  <view :style="{ height: statusHeight + 'px' }" />
  <view :style="{ height: navBarHeight + 'px' }"></view>
</template>

<script setup>
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { statusHeight, navBarHeight } = useSystemInfo();
</script>

<style scoped lang="scss"></style>
