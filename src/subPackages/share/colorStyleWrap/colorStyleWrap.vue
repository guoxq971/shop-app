<!--颜色/风格-->
<template>
  <view class="color-style-container">
    <view class="title">Color/Style</view>
    <!--风格-->
    <view class="style-list-wrap" :class="{ 'style-list-wrap-col': isCol }">
      <view class="style-wrap" :class="{ 'active-border': item.id === activeStyle }" v-for="item in list" :key="item.id" @click="onActiveStyle(item)">
        <vanImage :src="item.url"></vanImage>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Image as VanImage } from 'vant';
const emit = defineEmits(['select']);
const props = defineProps({
  list: { type: Array, default: () => [] },
  active: { type: String, default: '' },
  // row | col
  type: { type: String, default: 'row' },
});
const isCol = computed(() => props.type === 'col');

const activeStyle = ref('');
function onActiveStyle(item) {
  activeStyle.value = item.id;
  emit('select', item);
}
</script>

<style scoped lang="scss">
.van-image {
  width: 100%;
  height: 100%;
}

// 样式/颜色
.style-list-wrap-col {
  flex-wrap: wrap;
  .style-wrap {
    margin-bottom: 6px;
  }
}
.color-style-container {
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  .title {
    font-weight: bold;
    font-size: 14px;
  }
  .active-title {
    color: var(--primary-color);
  }

  .style-list-wrap {
    display: flex;
    overflow: auto;
    padding: 5px 0 9px 0;
    .style-wrap {
      min-width: 60px;
      height: 60px;
      border: 2px solid #bbb;
      padding: 2px;
      border-radius: 1px;
      margin-right: 6px;
      .style {
        width: 100%;
        height: 100%;
      }
    }
  }

  .active-border {
    border-color: var(--primary-color) !important;
  }
}
</style>
