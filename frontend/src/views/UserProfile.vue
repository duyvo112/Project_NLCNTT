<template>
    <div class="container-fluid p-0">
        <PageHeader title="Profile" />
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 d-none d-md-block p-0 border-end">
                <Sidebar class="sidebar-container" />
            </div>

            <!-- Profile Content -->
            <div class="col-md-10 pt-2">
                <div class="profile-container">
                    <div class="profile-header d-flex align-items-center justify-content-between">
                        <!-- Left side - User info -->
                        <div class="d-flex align-items-center">
                            <!-- Avatar và nút Edit Profile -->
                            <div class="profile-left d-flex flex-column align-items-center">
                                <div class="position-relative">
                                    <img :src="user.avatar" alt="Profile" class="w-10 profile-image rounded-circle">
                                    <font-awesome-icon v-if="isOwner" icon="camera" class="edit-avatar-icon"
                                        @click="openAvatarModal" />
                                </div>
                                <a v-if="isOwner" href="#" @click.prevent="openEditModal"
                                    class="edit-profile-link text-decoration-none mt-2">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                    Edit profile
                                </a>
                                <div class="m-3" v-if="!isOwner && !isFriend && !isRequest">
                                    <button class="btn btn-outline-primary" @click.prevent="addFriend">Add
                                        Friend</button>
                                </div>
                                <div class="m-3" v-if="!isOwner && !isFriend && isRequest">
                                    <button class="btn btn-outline-primary"
                                        @click.prevent="acceptFriendRequest(user._id)">Accept
                                        Friend</button>
                                </div>
                                <div class="m-3" v-if="!isOwner && !isFriend && isRequest">
                                    <button class="btn btn-outline-primary"
                                        @click.prevent="rejectFriendRequest(user._id)">Reject
                                        Friend</button>
                                </div>
                                <div class="m-3" v-if="isFriend">
                                    <button class="btn btn-outline-primary justify-content-between"
                                        @click.prevent="deleteFriend(user._id)">Remove
                                        Friend</button>
                                </div>

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

                        <!-- Admin Mode Toggle Button -->
                        <div v-if="isAdmin && !isOwner" class="admin-mode-toggle position-relative">
                            <button @click="toggleAdminMode" class="btn d-flex align-items-center"
                                :class="isAdminMode ? 'btn-danger' : 'btn-primary'">
                                {{ isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode' }}
                            </button>
                        </div>
                    </div>

                    <hr />

                    <!-- Content Section -->
                    <div class="content-section">
                        <!-- Admin Panel -->
                        <AdminDashboard v-if="isAdminMode" :user="user" :posts="posts"
                            @post-deleted="handlePostDeleted" />

                        <!-- Normal Posts View -->
                        <div v-else class="feed w-75 container">
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
        </div>

        <!-- Modal Edit Profile -->
        <EditProfileModal :user="user" :isOpen="isModalOpen" @close="closeEditModal" @updateUser="updateUserInfo" />
        <AvatarModal :isOpen="isAvatarModalOpen" @close="closeAvatarModal" @avatarUpdated="updateAvatar" />
    </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Post from "../components/Post.vue";
import EditProfileModal from "../components/EditProfileModal.vue";
import AvatarModal from "@/components/AvatarModal.vue";
import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import dayjs from 'dayjs';
import AdminDashboard from '../views/AdminDashboard.vue';


export default {
    name: "UserProfile",
    components: { Sidebar, Post, EditProfileModal, AvatarModal, PageHeader, AdminDashboard },

    setup() {
        const userStore = useUserStore();
        const postStore = usePostStore();
        const route = useRoute();

        const user = ref({});
        const posts = ref([]);
        const isLoading = ref(true);
        const isModalOpen = ref(false);
        const isAvatarModalOpen = ref(false);

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

        const addFriend = async () => {
            try {
                await userStore.addFriend(route.params.id);
                // Reload profile để cập nhật trạng thái bạn bè
                await loadUserProfile();
                // Cập nhật danh sách bạn bè trong store
                await userStore.fetchFriends(userStore.user._id);
            } catch (error) {
                console.error("Error adding friend:", error);
                if (error.response?.status === 400) {
                    alert('You have already sent a friend request to this user');
                } else {
                    alert('Error adding friend. Please try again later.');
                }
            }
        };


        const acceptFriendRequest = async (requestId) => {
            try {
                await userStore.acceptFriendRequest(requestId);
                loadUserProfile();

            } catch (error) {
                console.error("Error accepting friend request:", error);
            }
        };
        const rejectFriendRequest = async (requestId) => {
            try {
                await userStore.rejectFriendRequest(requestId);
                loadUserProfile();
            } catch (error) {
                console.error("Error rejecting friend request:", error);
            }
        };
        const deleteFriend = async (friendId) => {
            try {
                await userStore.deleteFriend(friendId);
                loadUserProfile();
            } catch (error) {
                console.error("Error deleting friend:", error);
            }
        };

        const openAvatarModal = () => {
            isAvatarModalOpen.value = true;
        };


        const closeAvatarModal = () => {
            isAvatarModalOpen.value = false;
        };

        const updateAvatar = (newAvatar) => {
            user.value.avatar = newAvatar;
            loadUserProfile();
        };

        const isAdminMode = ref(false);
        const toggleAdminMode = () => {
            isAdminMode.value = !isAdminMode.value;
        };

        const formatDate = (date) => {
            return dayjs(date).format('DD/MM/YYYY HH:mm');
        };

        const truncateText = (text, length) => {
            if (!text) return '';
            return text.length > length ? text.substring(0, length) + '...' : text;
        };


        const handlePostDeleted = async (postId) => {
            // Cập nhật lại danh sách posts sau khi xóa
            posts.value = posts.value.filter(post => post._id !== postId);
        };

        onMounted(loadUserProfile);
        watch(() => route.params.id, loadUserProfile);

        return {
            user,
            posts,
            isLoading,
            isModalOpen,
            isAvatarModalOpen,
            openEditModal,
            closeEditModal,
            updateUserInfo,
            addFriend,
            rejectFriendRequest,
            acceptFriendRequest,
            deleteFriend,
            openAvatarModal,
            closeAvatarModal,
            updateAvatar,
            isAdminMode,
            toggleAdminMode,
            formatDate,
            truncateText,
            handlePostDeleted
        };
    },
    computed: {
        isOwner() {
            const userStore = useUserStore();
            return userStore.user._id === this.$route.params.id;
        },
        isFriend() {
            const userStore = useUserStore();
            return userStore.friends.some(friend => friend._id === this.$route.params.id);
        },
        isRequest() {
            const userStore = useUserStore();
            return userStore.friendRequests.some(request => request._id === this.$route.params.id);
        },
        isAdmin() {
            const userStore = useUserStore();
            return userStore.isAdmin;
        },

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

.edit-avatar-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
}

.admin-dashboard {
    background-color: #f8f9fa;
    border-radius: 8px;
}

.admin-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table {
    font-size: 0.9rem;
}

.admin-mode-toggle {
    margin-left: auto;
    padding: 0 15px;
}

@media (max-width: 768px) {
    .admin-mode-toggle {
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }

    .admin-mode-toggle button {
        width: 100%;
        justify-content: center;
    }
}
</style>
