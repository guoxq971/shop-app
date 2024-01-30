<!--成功或失败-->
<template>
  <view>
    <!--    状态栏-->
    <status-bar></status-bar>
    <!--    导航栏-->
    <NavBar title="Confirm the Order" left-text="Back" left-arrow @click-left="onClickLeft" />
  </view>
</template>

<script setup>
import statusBar from '@/components/statusBar/statusBar.vue';
import { NavBar } from 'vant';
</script>

<style scoped lang="scss"></style>
