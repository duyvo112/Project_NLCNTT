import { defineStore } from 'pinia'
import socialMediaApi from '../services/socialMediaApi.service'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: null,
    friends: [],
  }),
  getters: {
    isAuthenticated() {
      return this.user !== null && this.accessToken !== null
    },
  },
  actions: {
    async fetchUser(userId) {
      try {
        const response = await socialMediaApi.getUser(userId)
        return response.data // ✅ Trả về dữ liệu thay vì ghi đè this.user
      } catch (error) {
        console.error('Error fetching user:', error)
        return null
      }
    },

    async fetchFriends(userId) {
      // ✅ Lấy danh sách bạn bè từ API
      try {
        const response = await socialMediaApi.getFriends(userId)
        this.friends = response.data.map((friend) => ({
          _id: friend._id, // ✅ ID của bạn bè
          username: friend.username,
          avatar: friend.avatar,
        }))
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    },
    async updateUser(userId, updatedUser) {
      try {
        const response = await socialMediaApi.updateUser(userId, updatedUser)
        this.user = response.data
      } catch (error) {
        console.error('Error updating user:', error)
      }
    },
    setUser(userData) {
      this.user = userData
    },
    setAccessToken(token) {
      this.accessToken = token
    },
    register(userData) {
      console.log(userData)
      return socialMediaApi.register(userData)
    },
    logout() {
      localStorage.removeItem('post')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    },
  },
  persist: true, // Giữ trạng thái sau khi reload (nếu dùng pinia-plugin-persistedstate)
})
