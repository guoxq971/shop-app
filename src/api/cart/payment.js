import { server, Method } from '../request';
/**
 * 支付
 * */

// 获取订单信息
export const orderInfo = (data) => {
  return server('/p/order/confirmOrder', Method.POST, data);
};

// 生成订单,返回订单流水号
export const createOrder = (data) => {
  return server('/p/order/submitOrder', Method.POST, data);
};

// 手机支付:创建预支付订单
export const paymentOrder = (data) => {
  return server('/payPal/mobile/create', Method.POST, data);
};
