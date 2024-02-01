import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import { cartList, updateItem, deleteItem, totalPay, addItem } from '@/api/cart/cart';

export const useCountStore = defineStore('countStore', () => {
  // 购物车列表
  const list = ref([]);
  // 购物车合计
  let cartTotal = reactive({
    totalMoney: '', // 订单金额
    finalMoney: '', // 实际支付金额
    subtractMoney: '', // 减免金额
    count: '', // 商品数量
  });
  // 勾选购物车的数据
  const checkboxValue = ref([]);

  // 获取购物车列表
  const getCartList = async () => {
    const { data } = await cartList();
    list.value = data;
  };

  // 删除购物车
  const delCart = async (basketIds) => {
    const res = await deleteItem(basketIds);
    if (res) {
      const len = checkboxValue.value.findIndex((check) => check === item.basketId);
      if (len > -1) {
        checkboxValue.value.splice(len, 1);
      }
      await getCartList();
      await getCartPrice();
    }
  };

  // 清空勾选数据和价格
  const clearCart = async () => {
    checkboxValue.value = [];
    await getCartPrice();
  };

  // 修改购物车的数量
  let updateCart = async (item) => {
    const obj = {
      basketId: item.basketId, // 购物车id
      count: item.basketCount,
      prodId: item.prodId, // 产品Id
      skuId: item.skuId,
    };
    const res = await updateItem(obj);
    if (res) await getCartPrice();
  };

  // 勾选全部数据
  const checkAllList = (value) => {
    if (value) {
      checkboxValue.value = list.value.map((item) => item.basketId);
    } else {
      checkboxValue.value = [];
    }
  };

  // 购物车数量
  const cartNum = computed(() => {
    return list.value.length;
  });

  // 获取勾选数据的价格
  const getCartPrice = async () => {
    const setVal = (data) => {
      Object.keys(cartTotal).forEach((key) => {
        cartTotal[key] = data ? data[key] : '';
      });
    };

    if (checkboxValue.value.length === 0) {
      setVal();
      return;
    }
    const res = await totalPay(checkboxValue.value);
    if (res) {
      setVal(res.data);
    }
  };

  // 添加购物车
  const addCart = async (item) => {
    const obj = {
      count: item.count, // 产品数量
      prodId: item.prodId, // 产品id
      skuId: item.skuId, // skuId
    };
    const res = await addItem(obj);
    if (res) {
      await getCartList();
    }
  };

  // 根据勾选的产品的id获取产品列表
  const getCartListById = () => {
    let arr = [];
    if (checkboxValue.value.length > 0) {
      arr = list.value.filter((item) => checkboxValue.value.includes(item.basketId));
    }
    return arr;
  };

  return {
    list,
    cartTotal,
    checkboxValue,
    delCart,
    updateCart,
    getCartList,
    checkAllList,
    cartNum,
    getCartPrice,
    addCart,
    getCartListById,
    clearCart,
  };
});
