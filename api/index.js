import http from '@/utils/request'
const req = http.request.bind(http)

// home
export const getBannerList = data => req.get('/banner_list', data)

// login
export function login (data) {
  return req({
    method: 'post',
    url: '/login',
    data
  })
}

export function getDiscList (data) {
  return req({
    method: 'get',
    url: 'https://qyhever.com/common/disc',
    data
  })
}
