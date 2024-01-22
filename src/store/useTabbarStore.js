import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTabbarStore = defineStore('tabbar', () => {
  const value = ref('index');

  const setValue = (val) => {
    value.value = val;
  };

  return {
    value,
    setValue,
  };
});
