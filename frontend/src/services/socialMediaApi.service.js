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
  searchUsers: (username) => axiosInstance.get(`/api/user/search?username=${username}`),
  //Posts
  getPosts: () => axiosInstance.get('/api/post'),
  createPost: (data) =>
    axiosInstance.post('/api/post', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getPostbyUser: (id) => axiosInstance.get(`/api/post/user/${id}`),
  likePost: (id) => axiosInstance.put(`/api/post/like/${id}`),
  getComments: (id) => axiosInstance.get(`/api/post/comments/${id}`),
  addComment: (id, data) => axiosInstance.put(`/api/post/comment/${id}`, data),
  deletePost: (id) => axiosInstance.delete(`/api/post/${id}`),
  //Friends
  getFriends: (id) => axiosInstance.get(`/api/user/friends/${id}`),
  addFriend: (id) => axiosInstance.put(`/api/user/send-request/${id}`),
  getUserFriendRequests: (id) => axiosInstance.get(`/api/user/friend-requests/${id}`),
  acceptFriendRequest: (id) => axiosInstance.put(`/api/user/accept-request/${id}`),
  rejectFriendRequest: (id) => axiosInstance.put(`/api/user/reject-request/${id}`),
  deleteFriend: (id) => axiosInstance.put(`/api/user/delete-friend/${id}`),
  //Explore
  getLatestNews: () => axiosInstance.get('/api/explore/latest-news'),
}

export default socialMediaApi
