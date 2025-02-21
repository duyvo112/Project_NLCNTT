import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  getters: {
    isAuthenticated() {
      return this.user !== null && this.accessToken !== null;
    },
  },
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setAccessToken(token) {
      this.accessToken = token;
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  persist: true, // Giữ trạng thái sau khi reload (nếu dùng pinia-plugin-persistedstate)
});
