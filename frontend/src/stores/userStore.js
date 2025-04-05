import { defineStore } from 'pinia'
import socialMediaApi from '../services/socialMediaApi.service'
import router from '../router'
import { jwtDecode } from 'jwt-decode'
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
    isAdmin() {
      const decodedToken = jwtDecode(this.accessToken)
      return decodedToken.isAdmin
    },
  },
  actions: {
    checkAdminAccess() {
      return this.isAdmin
    },
    async banUser(banInfo) {
      try {
        const response = await socialMediaApi.banUser(banInfo)
        return response.data
      } catch (error) {
        console.error('Error banning user:', error)
        throw error
      }
    },
    async checkBanned(userId) {
      try {
        const response = await socialMediaApi.checkBanned(userId)
        return response.data
      } catch (error) {
        console.error('Error checking banned user:', error)
        return null
      }
    },

    async fetchUser(userId) {
      try {
        const response = await socialMediaApi.getUser(userId)
        return response.data
      } catch (error) {
        console.error('Error fetching user:', error)
        return null
      }
    },

    async fetchFriends(userId) {
      try {
        const response = await socialMediaApi.getFriends(userId)
        this.friends = response.data.map((friend) => ({
          _id: friend._id,
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
    async updateAvatar(userId, avatar) {
      try {
        const response = await socialMediaApi.updateAvatar(userId, avatar)
        this.user.avatar = response.data.avatar
      } catch (error) {
        console.error('Error updating avatar:', error)
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
    async logout() {
      try {
        // Gọi API logout
        await socialMediaApi.logout()
        // Xóa dữ liệu trong localStorage
        localStorage.removeItem('post')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')

        // Đảm bảo state đã được cập nhật trước khi chuyển trang
        await router.push({ name: 'LoginPage' })

        // Reload trang để đảm bảo reset hoàn toàn state
        window.location.reload()
      } catch (error) {
        console.error('Logout error:', error)
        // Vẫn chuyển về trang login ngay cả khi có lỗi
        router.push({ name: 'LoginPage' })
      }
    },
  },
  persist: true,
})
