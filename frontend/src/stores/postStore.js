import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import socialMediaApi from '@/services/socialMediaApi.service'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async getPosts() {
      try {
        const response = await socialMediaApi.getPosts()
        this.posts = response.data
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    },
    async getPostbyUser(userId) {
      try {
        const response = await socialMediaApi.getPostbyUser(userId)
        return response.data // ✅ Trả về dữ liệu thay vì ghi đè this.posts
      } catch (error) {
        console.error('Error fetching posts:', error)
        return []
      }
    },

    async likePost(id) {
      try {
        await socialMediaApi.likePost(id)
        await this.getPostbyUser(useUserStore().user._id)
      } catch (error) {
        console.error(error)
      }
    },
  },
  persist: true,
})
