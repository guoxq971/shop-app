import { server, Method } from '../request';
/**
 * 首页
 * */

//一级分类 categoryType 0-导航栏中的分类的一级菜单 1-选择主题的右侧顶部菜单
export const getCategoryListApi = (data = {}) => {
  return server(`/category/listAllFirst/${data.categoryType}`, Method.GET, data);
};

//二级分类 categoryType 0-导航栏中的分类的二级菜单 1-选择主题的右侧列表
export const getCategoryListSecondApi = (data = {}) => {
  return server(`/category/listAllSecond/${data.categoryType}`, Method.GET, data);
};

//二级分类 categoryType 0-选择主题的左侧菜单（目前只有传0的）
export const getCategoryListPartSecondApi = (data = {}) => {
  return server(`/category/listPartSecond/${data.categoryType}/${data.parentId}`, Method.GET, data);
};

//获取推荐商品列表
export const getGoodsRecommendApi = (data = {}) => {
  return server(`/prod/prod/listRecommend`, Method.GET, data);
};

//获取商品列表
export const getGoodsListApi = (data = {}) => {
  return server(`/prod/prod/listCategoryProduct/${data.pageNum}/${data.pageSize}`, Method.POST, data);
};
