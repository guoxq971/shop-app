import { server, Method } from '../request';
/**
 * 地址信息
 * */

// 获取地址信息
export const infoAddress = () => {
  return server('/p/tiShippingAddress/get', Method.GET);
};

// 新增地址
export const addAddress = (data) => {
  return server('/p/tiShippingAddress/add', Method.POST, data);
};

// 修改收货地址
export const updateAddress = (data) => {
  return server('/p/tiShippingAddress/update', Method.POST, data);
};

// 获取物流方式(通过产品,包含运费)
export const listExpressByProdList = (data = []) => {
  return server('/express/listExpressByProdList', Method.POST, data);
};
