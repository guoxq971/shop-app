import { server, Method } from '../request';
/**
 * 购物车
 * */

//购物车列表
export const cartList = (data = {}) => {
  return server('/p/basket/info', Method.POST, data);
};

//修改购物车的产品数量
export const updateItem = (data = {}) => {
  return server('/p/basket/updateItem', Method.POST, data);
};

//单个删除用户购物车物品
export const deleteItem = (data = []) => {
  return server('/p/basket/deleteItem', Method.DELETE, data);
};

//获取购物车商品数量
export const prodCount = () => {
  return server('/p/basket/prodCount', Method.GET, {});
};