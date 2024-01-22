<!--顶部导航栏-->
<template>
  <u-navbar :auto-back="true" :title="title" @left-click="leftClick" :autoBack="true" :left-icon="leftIcon" bg-color="#f2f2f2" left-icon-color="" :placeholder="true" />
</template>

<script setup>
import { computed, defineProps } from 'vue';
import uNavbar from 'uview-plus/components/u-navbar/u-navbar.vue';

const emit = defineEmits(['left-click']);
const props = defineProps({
  title: { type: String, default: '' },
  isBack: { type: Boolean, default: false },
});

const leftIcon = computed(() => {
  return props.isBack ? 'arrow-left' : '';
});

function leftClick(e) {
  console.log('leftClick', e);
  emit('left-click');
}
</script>

<style scoped lang="scss"></style>
