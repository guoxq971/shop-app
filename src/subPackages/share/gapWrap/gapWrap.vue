<template>
  <view :style="{ height: size }"></view>
</template>

<script setup>
defineProps({
  size: { type: String, default: '36rpx' },
});
</script>

<style scoped lang="scss"></style>
