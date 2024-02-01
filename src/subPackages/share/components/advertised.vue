<template>
  <view v-if="src" class="advertised" :style="{ height }">
    <VanImage class="image" :src="src_computed" />
  </view>
</template>

<script setup>
import { Image as VanImage } from 'vant';
import { computed } from 'vue';
const props = defineProps({
  src: { type: String, default: '' },
  height: { type: String, default: '100rpx' },
});
const src_computed = computed(() => {
  console.log('props.src', props.src);
  if (!props.src) return '';
  // 判断是否有http
  if (props.src?.startsWith('http')) {
    return props.src;
  }
  return uni.$basePathImg + props.src;
});
</script>

<style scoped lang="scss">
.advertised {
  background: #f2f2f2;
  border-top: 1rpx solid #bbb;
  border-bottom: 1rpx solid #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
