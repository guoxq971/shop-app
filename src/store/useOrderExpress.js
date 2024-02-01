/**
 * 创建订单前的物流信息及订单备注
 * */

import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useOrderExpress = defineStore('useOrderExpress', () => {
  const expressInfo = reactive({
    seqId: '', // 快递主键
    name: '', // 快递名称
    expressFee: '', // 快递运费
    transfeeId: '', // 运费表id
    label: '', // 时效
    remark: '', // 订单备注
  });
  return {
    expressInfo,
  };
});
