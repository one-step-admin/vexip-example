import axios from 'axios'

// import qs from 'qs'
import Message from 'vue-m-message'
import router from '@/router/index'
import useUserStore from '@/store/modules/user'

function toLogin() {
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined,
    },
  })
}

const api = axios.create({
  baseURL: (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000,
  responseType: 'json',
})

api.interceptors.request.use(
  (request) => {
    const userStore = useUserStore()
    /**
     * 全局拦截请求发送前提交的参数
     * 以下代码为示例，在请求头里带上 token 信息
     */
    if (userStore.isLogin && request.headers) {
      request.headers.Token = userStore.token
    }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.method === 'post') {
      // request.data = qs.stringify(request.data, {
      //   arrayFormat: 'brackets',
      // })
    }
    return request
  },
)

api.interceptors.response.use(
  (response) => {
    /**
     * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
     * 假设返回数据格式为：{ status: 1, error: '', data: '' }
     * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
     * 请求出错时 error 会返回错误信息
     */
    if (response.data.status === 1) {
      if (response.data.error !== '') {
        // 错误提示
        Message.error(response.data.error, {
          zIndex: 2000,
        })
        return Promise.reject(response.data)
      }
    }
    else {
      toLogin()
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error') {
      message = '后端网络故障'
    }
    else if (message.includes('timeout')) {
      message = '接口请求超时'
    }
    else if (message.includes('Request failed with status code')) {
      message = `接口${message.substr(message.length - 3)}异常`
    }
    Message.error(message, {
      zIndex: 2000,
    })
    return Promise.reject(error)
  },
)

export default api
