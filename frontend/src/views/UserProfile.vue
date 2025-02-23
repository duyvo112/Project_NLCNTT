<template>
    <div class="container-fluid p-0">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 d-none d-md-block p-0 border-end">
                <Sidebar class="sidebar-container" />
            </div>
            <!-- Profile Content -->
            <div class="col-md-10 pt-2">
                <div class="profile-container">
                    <div class="profile-header d-flex align-items-center">
                        <img :src="user.avatar" alt="Profile"
                            class="w-10 profile-image rounded-circle align-self-start">
                        <div class="ms-3">
                            <h3 class="username">{{ user.username }}</h3>
                            <p class="real-name">{{ user.fullname }}</p>
                            <div class="profile-stats d-flex gap-3">
                                <span><strong>{{ posts.length }}</strong> posts </span>
                                <span><strong>{{ user.friends?.length || 0 }}</strong> friends</span>
                            </div>
                            <div class="about-user">
                                <p>{{ user.about }}</p>
                            </div>
                            <button class="btn btn-outline-secondary mt-2">Edit profile</button>
                        </div>
                    </div>
                    <hr />
                    <div class="feed w-75 container">
                        <div v-if="isLoading" class="spinner-container">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <Post v-for="post in posts" v-else :key="post.id" :post="post" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Post from "../components/Post.vue";
import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "UserProfile",
    components: { Sidebar, Post },
    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const route = useRoute();

        const user = ref({});
        const posts = ref([]);
        const isLoading = ref(true); // ✅ Thêm biến theo dõi trạng thái tải

        const loadUserProfile = async () => {
            try {
                isLoading.value = true; // ✅ Bắt đầu tải dữ liệu

                const userData = await userStore.fetchUser(route.params.id);
                user.value = { ...userData };

                const userPosts = await postStore.getPostbyUser(route.params.id);
                posts.value = [...userPosts];

            } catch (error) {
                console.error("Error loading user profile:", error);
            } finally {
                isLoading.value = false; // ✅ Kết thúc tải
            }
        };

        onMounted(loadUserProfile);
        watch(() => route.params.id, loadUserProfile);

        return { user, posts, isLoading };
    },

};
</script>

<style scoped>
.w-10 {
    width: 10%;
}

/* CSS cho spinner */
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>
