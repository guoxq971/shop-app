import { showToast, showFailToast } from 'vant';

// 请求地址
// const baseUrl = 'http://192.168.2.165:61001'
const baseUrl = 'http://192.168.2.3:8086'; // 金厚本地
// const baseUrl = 'http://192.168.2.58:8086'; // wpk本地

export const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

/**
 * 接口请求
 * @param {string} url 地址
 * @param {string} method 请求方法 GET POST
 * @param {object} params 参数
 * @returns {promise}
 *
 * */
export function server(url, method, params = {}, tkn = false) {
  uni.showLoading({ title: 'loading...' });
  let promise = new Promise((resolve, reject) => {
    // 这里是获取 token
    // let token = uni.getStorageSync("token")
    let token = 'bd3dd8e3-18b8-40f8-ab06-141f988f2194'; // bd3dd8e3-18b8-40f8-ab06-141f988f2194
    uni.request({
      url: baseUrl + url, // H5下
      data: params,
      method: method,
      dataType: 'json',
      header: {
        // 'domain-scope':'www.marathonbm.com',
        // 'req-device-version':`H5[${navigator.userAgent}]|&#x53EF;&#x53D8;&#x7248;&#x672C;`,
        'content-type': method == 'POST' ? 'application/json;charset=UTF-8' : 'application/json',
        Authorization: token,
      },

      // 成功
      success: function (res) {
        // 未登录
        if (res.data.code === 'A00004') {
          showToast({
            message: '请登录',
            icon: 'fail',
            duration: 1000,
          });
          uni.removeStorageSync('token');
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/me/index',
            });
          }, 1000);
          return resolve();
        }
        // 成功
        if (['200', '00000'].includes(res.data.code)) {
          resolve(res.data);
        } else {
          // 失败
          showFailToast(res.data.msg);
          reject();
        }
      },
      // 失败
      fail: function (res) {
        reject(res);
        setTimeout(() => {
          uni.hideLoading();
        }, 1000);
      },
      complete: function (res) {
        uni.hideLoading();
      },
    });
  });
  return promise;
}
