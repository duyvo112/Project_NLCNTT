import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import socialMediaApi from '@/services/socialMediaApi.service'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    comments: [],
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
    async createPost(data) {
      try {
        const response = await socialMediaApi.createPost(data)
        await this.getPosts()
        return response.data
      } catch (error) {
        console.error('Error creating post:', error)
      }
    },
    async deletePost(id) {
      try {
        await socialMediaApi.deletePost(id)
        this.posts = this.posts.filter((post) => post._id !== id)
        await useUserStore().getPostbyUser(useUserStore().user._id)
        await this.getPosts()
      } catch (error) {
        console.error('Error deleting post:', error)
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
    async getComments(id) {
      try {
        const response = await socialMediaApi.getComments(id)
        return response.data
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    },
    async addComment(id, data) {
      try {
        const response = await socialMediaApi.addComment(id, data)
        return response.data
      } catch (error) {
        console.error('Error adding comment:', error)
      }
    },
  },

  persist: true,
})
