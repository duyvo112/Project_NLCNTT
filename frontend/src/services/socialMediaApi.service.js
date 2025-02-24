import axiosInstance from './api.service'

const socialMediaApi = {
  //Authentication
  login: (data) => axiosInstance.post('/api/auth/login', data),
  register: (data) => axiosInstance.post('/api/auth/register', data),
  logout: () => axiosInstance.post('/api/auth/logout'),
  refreshToken: () => axiosInstance.post('/api/auth/refresh'),
  //User
  getUser: (id) => axiosInstance.get(`/api/user/${id}`),
  updateUser: (id, data) => axiosInstance.put(`/api/user/${id}`, data),
  //Posts
  getPosts: () => axiosInstance.get('/api/post'),
  createPost: (data) =>
    axiosInstance.post('/api/post', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getPostbyUser: (id) => axiosInstance.get(`/api/post/user/${id}`),
  likePost: (id) => axiosInstance.put(`/api/post/like/${id}`),
  getComments: (id) => axiosInstance.get(`/api/post/comments/${id}`),
  addComment: (id, data) => axiosInstance.put(`/api/post/comment/${id}`, data),
  //Friends
  getFriends: (id) => axiosInstance.get(`/api/user/friends/${id}`),
}

export default socialMediaApi
