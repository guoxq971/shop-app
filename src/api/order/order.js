import { server, Method } from '../request';
/**
 * 我的订单
 * */

//订单列表
export const orderList = (data = {}) => {
  return server(`/p/order/list/${data.pageNum}/${data.pageSize}?status=${data.status}`, Method.POST, {});
};

//订单详情
export const orderDetail = (orderNumber) => {
  return server(`/p/order/getOrderDetail/${orderNumber}`, Method.GET);
};

//删除订单
export const orderDel = (orderNumber) => {
  return server(`/p/order/delete/${orderNumber}`, Method.DELETE);
};

//确认收货
export const orderConfirm = (orderNumber) => {
  return server(`/p/order/receipt/${orderNumber}`, Method.PUT);
};

//取消订单
export const orderCancel = (orderNumber) => {
  return server(`/p/order/cancel/${orderNumber}`, Method.PUT);
};
