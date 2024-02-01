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

//获取商品详情
export const getDetailApi = (data = {}) => {
  return server(`/prod/prod/getDetail/${data.prodId}`, Method.GET, data);
};

//获取商品相关评论 type:类型(0-全部1-最新评论)
export const getListCommentApi = (data = {}) => {
  return server(`/prod/prod/listComment/${data.prodId}/${data.type}`, Method.GET, data);
};

//获取商品相关产品 TODO:wpk还没写
export const getRelationApi = (data = {}) => {
  return server(`/getRelation/${data.prodId}`, Method.GET, data);
};

//获取广告位
export const getAdvertisingApi = (data = {}) => {
  const obj = Object.assign(
    {
      shopId: 1,
      sort: '',
    },
    data || {},
  );
  return server(`/p/indexImg/getAdvertising`, Method.GET, obj);
};

//获取分组信息(热卖)
export const getProdListByTagIdApi = (data = {}) => {
  const obj = Object.assign(
    {
      tagId: 2, //2-热卖
      size: 6,
    },
    data || {},
  );
  return server(`/prod/prodListByTagId`, Method.GET, obj);
};

//获取网站管理内容
export const getConfigurationApi = (data = {}) => {
  const obj = Object.assign(
    {
      shopId: 1,
    },
    data || {},
  );
  return server(`/p/indexImg/getConfiguration`, Method.GET, obj);
};
