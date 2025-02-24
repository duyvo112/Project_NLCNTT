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
                        <!-- Avatar và nút Edit Profile -->
                        <div class="profile-left d-flex flex-column align-items-center">
                            <img :src="user.avatar" alt="Profile" class="w-10 profile-image rounded-circle">
                            <a v-if="isOwner" href="#" @click.prevent="openEditModal"
                                class="edit-profile-link text-decoration-none mt-2">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                Edit profile
                            </a>
                        </div>

                        <!-- Thông tin cá nhân -->
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
                        </div>
                    </div>

                    <hr />
                    <div class="feed w-75 container">
                        <div v-if="isLoading" class="spinner-container">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-if="posts.length > 0">
                            <Post v-for="post in posts" :key="post.id" :post="post" />
                        </div>
                        <div v-else>
                            <h3 class="text-center">No posts yet</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Edit Profile -->
        <EditProfileModal :user="user" :isOpen="isModalOpen" @close="closeEditModal" @updateUser="updateUserInfo" />
    </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Post from "../components/Post.vue";
import EditProfileModal from "../components/EditProfileModal.vue";
import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "UserProfile",
    components: { Sidebar, Post, EditProfileModal },

    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const route = useRoute();

        const user = ref({});
        const posts = ref([]);
        const isLoading = ref(true);
        const isModalOpen = ref(false); // ✅ Thêm biến theo dõi modal

        const loadUserProfile = async () => {
            try {
                isLoading.value = true;

                const userData = await userStore.fetchUser(route.params.id);
                user.value = { ...userData };

                const userPosts = await postStore.getPostbyUser(route.params.id);
                posts.value = [...userPosts];

            } catch (error) {
                console.error("Error loading user profile:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const openEditModal = () => {
            isModalOpen.value = true;
        };

        const closeEditModal = () => {
            isModalOpen.value = false;
        };

        const updateUserInfo = async (updatedUser) => {
            try {
                await userStore.updateUser(route.params.id, updatedUser);
                user.value = { ...updatedUser }; // Cập nhật giao diện
            } catch (error) {
                console.error("Error updating user:", error);
            }
        };

        onMounted(loadUserProfile);
        watch(() => route.params.id, loadUserProfile);

        return { user, posts, isLoading, isModalOpen, openEditModal, closeEditModal, updateUserInfo };
    },
    computed: {
        isOwner() {
            const userStore = useUserStore();
            return userStore.user._id === this.$route.params.id;
        }
    }
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

.profile-left {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.w-10 {
    width: 80px;
    height: 80px;
}

.edit-profile-link {
    margin-top: 5px;
}
</style>
