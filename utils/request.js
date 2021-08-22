// import Vue from 'vue'
// import store from '@/store'
// import http from './uview/request'
import http from '@/uview-ui/libs/request'
import { showAlertModal } from './index'

// https://www.uviewui.com/js/http.html#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0
http.setConfig({
  // baseUrl: 'https://qyhever.com',
  baseUrl: 'http://localhost:3000',
  loadingText: '拼命加载中~',
  loadingTime: 800,
  originalData: true,
  header: {
    // 'content-type': 'application/x-www-form-urlencoded'
  }
  // ......
})

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器开小差了，稍后再试吧~~',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

// 请求拦截，配置Token等参数
http.interceptor.request = (config) => {
  // const token = uni.getStorageSync('token')
  // config.header.token = token
  // config.header.token = 'xxxxxx'

  return config
}

// 响应拦截，判断状态码是否通过
http.interceptor.response = (res) => {
  if (res.statusCode === 200) {
    const resData = res.data
    // 正常响应 code 200
    if (resData.code === 200 || resData.success) {
      return resData.data
    }
    // 非正常响应 code 201
    if (resData.code === 201) {
      showAlertModal('验证失败，请重新登录')
        .then(([, data]) => {
          if (data.confirm) {
            // to login page
          }
        })
      return false
    }
    // 非正常响应 code 非 200
    showAlertModal(resData.message || '操作失败')
    return false
  }
  // 响应异常 如 500
  showAlertModal(codeMessage[res.statusCode] || '操作失败')
  return false
}

export default http
