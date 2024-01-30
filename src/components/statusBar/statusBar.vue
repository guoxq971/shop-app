<!--状态栏-->
<template>
  <view :style="{ height: statusHeight + 'px' }" />
</template>

<script setup>
import { useSystemInfo } from '@/hooks/useSystemInfo';
const { statusHeight } = useSystemInfo();
</script>

<style scoped lang="scss"></style>
