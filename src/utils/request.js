import axios from 'axios';
import { Message } from 'element-ui'; // 这里我是使用elementUI的组件来给提示
import router from '@/router';
import { getToken } from '@/utils/auth';

const request = axios.create({
  // 创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  baseURL: `${location.origin}/`, // 公共接口-本地
  // baseURL: location.origin + '/okr', // 公共接口-生产
  // baseURL: process.env.NODE_ENV === 'production' ? '' : '/api'   //根据自己配置的反向代理去设置不同环境的baeUrl
});
// 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
// 首先统一设置post请求头。 get属于简单请求 不需要设置content-type
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const httpCode = {
  // 常见的http状态码信息
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
}; // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加

/** 添加请求拦截器 * */ request.interceptors.request.use(
  config => {
    // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    config.headers.Authorization = getToken() || ''; // 设置token
    //   // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    //   if (config.url.includes('pur/contract/export')) {
    //     config.headers['responseType'] = 'blob'
    //   }
    //   // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    //   if (config.url.includes('pur/contract/upload')) {
    //     config.headers['Content-Type'] = 'multipart/form-data'
    //   }
    return config;
  },
  error =>
    // 对请求错误做些什么
    Promise.reject(error),
);

/** 添加响应拦截器  * */
request.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return Promise.resolve(response.data);
    }
    Message({
      message: response.data.msg,
      type: 'error',
    });
    return Promise.reject(response.data.msg);
  },
  error => {
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      const tips =
        error.response.code in httpCode ? httpCode[error.response.code] : error.response.data.msg;
      Message({
        message: tips,
        type: 'error',
      });

      if (error.response.status === 401) {
        // token或者登陆失效情况下跳转到登录页面，根据实际情况
        router.push({
          path: `/login`,
        });
      }
      return Promise.reject(error);
    }
    Message({
      message: '请求超时, 请刷新重试',
      type: 'error',
    });
    return Promise.reject(new Error('请求超时, 请刷新重试'));
  },
);

export default request; // 不用  留着以后封装需要设置content-type上传文件等方式

/* 统一封装get请求 */ export const get = (url, params, config = {}) =>
  new Promise((resolve, reject) => {
    request({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
