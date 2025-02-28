import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://projectnlcntt-production.up.railway.app',
  withCredentials: true,
})

// Gắn token vào header của request
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['token'] = `Bearer ${token}` // Gắn token vào header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Xử lý refresh token khi token hết hạn
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refreshToken')

      const response = await axiosInstance.post('/api/auth/refresh', {
        refreshToken: refreshToken,
      })

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken)
        return axiosInstance(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
