<template>
  <view :style="{ height: size }"></view>
</template>

<script setup>
defineProps({
  size: { type: String, default: '0px' },
});
</script>

<style scoped lang="scss"></style>
