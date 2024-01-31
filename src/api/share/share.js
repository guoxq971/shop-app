import { server, Method } from '../request';
/**
 * 首页
 * */

//一级分类 categoryType 0-首页 1-标签页
export const getCategoryListApi = (data = {}) => {
  return server(`/category/listAllFirst/${data.categoryType}`, Method.GET, data);
};

//二级分类 categoryType 0-首页 1-标签页
export const getCategoryListSecondApi = (data = {}) => {
  return server(`/category/listAllSecond/${data.categoryType}`, Method.GET, data);
};
