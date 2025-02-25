import { defineStore } from 'pinia'
import socialMediaApi from '../services/socialMediaApi.service'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: null,
    friends: [],
    friendRequests: [],
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
    async addFriend(userId) {
      try {
        const response = await socialMediaApi.addFriend(userId)
        this.friends.push(response.data)
      } catch (error) {
        console.error('Error adding friend:', error)
        if (error.response.status === 400) {
          alert('You have already sent a friend request to this user')
        }
      }
    },
    async fetchFriendRequests(userId) {
      try {
        const response = await socialMediaApi.getUserFriendRequests(userId)
        this.friendRequests = response.data
      } catch (error) {
        console.error('Error fetching friend requests:', error)
      }
    },
    async acceptFriendRequest(requestId) {
      try {
        await socialMediaApi.acceptFriendRequest(requestId)
        this.friendRequests = this.friendRequests.filter((request) => request._id !== requestId)
        this.friends.push(requestId)
        this.fetchFriendRequests(this.user._id)
        this.fetchFriends(this.user._id)
      } catch (error) {
        console.error('Error accepting friend request:', error)
      }
    },
    async rejectFriendRequest(requestId) {
      try {
        await socialMediaApi.rejectFriendRequest(requestId)
        this.friendRequests = this.friendRequests.filter((request) => request._id !== requestId)
      } catch (error) {
        console.error('Error rejecting friend request:', error)
      }
    },
    async deleteFriend(friendId) {
      try {
        await socialMediaApi.deleteFriend(friendId)
        this.friends = this.friends.filter((friend) => friend._id !== friendId)
        this.fetchFriends(this.user._id)
        this.fetchFriendRequests(this.user._id)
        this.fetchUser(this.user._id)
      } catch (error) {
        console.error('Error deleting friend:', error)
      }
    },
    async searchUsers(username) {
      try {
        const response = await socialMediaApi.searchUsers(username)
        return response.data
      } catch (error) {
        console.error('Error searching users:', error)
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
