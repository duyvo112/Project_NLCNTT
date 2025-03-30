<template>
    <div class="suggestions p-3 ps-0 pe-0">
        <!-- Nút đóng cho mobile -->
        <button class="close-btn d-md-none" @click="$emit('close')">
            <font-awesome-icon :icon="['fas', 'times']" />
        </button>

        <!-- Hiển thị profile của user -->
        <div class="profile d-flex align-items-center justify-content-center">
            <router-link :to="{ name: 'UserProfile', params: { id: user._id } }" class="text-decoration-none">
                <div class="user-detail flex-grow-1 d-flex align-items-center text-decoration-none text-dark">

                    <img :src="user.avatar" alt="Profile picture" class="rounded-circle w-10 me-2" />
                    <h5 class="mb-0 fs-6 d-flex flex-column">
                        <span class="fw-bold">{{ user.username }}
                            <font-awesome-icon v-if="isAdmin" class="mt-2" :icon="['fas', 'shield-halved']" />
                        </span>
                        <small class="text-muted text-sm fw-light">{{ user.fullname }}</small>
                    </h5>


                </div>
            </router-link>
            <div class="logout">
                <a href="#" @click="Logout" class="text-decoration-none me-5">Logout</a>
            </div>
        </div>

        <!-- Hiển thị danh sách bạn bè -->
        <h5 class="mt-3">Your Friends</h5>
        <ul class="list-group">
            <li v-for="friend in friends" :key="friend._id" class="list-group-item d-flex align-items-center">
                <router-link :to="{ name: 'UserProfile', params: { id: friend._id } }"
                    class="text-decoration-none text-dark">
                    <img :src="friend.avatar" alt="Friend's profile picture" class="rounded-circle w-10 me-2" />
                    <strong class="fs-6">{{ friend.username }}</strong>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { useUserStore } from "../stores/userStore";
import { computed } from "vue";

export default {
    name: "SuggestionsBar",
    setup() {
        const userStore = useUserStore();

        // Lấy dữ liệu từ store
        const user = computed(() => userStore.user);
        const friends = computed(() => userStore.friends);

        // Hàm logout
        const Logout = async () => {
            try {
                userStore.logout();
            } catch (error) {
                console.log(error);
            }
        };
        const isAdmin = computed(() => userStore.isAdmin);
        return { user, friends, Logout, isAdmin };
    },
    created() {
        useUserStore().fetchFriends(useUserStore().user._id);
        console.log("isAdmin", useUserStore().isAdmin);
    }
};
</script>

<style scoped>
.w-10 {
    width: 18%;
}

.suggestions {
    color: black;
}

.list-group-item {
    color: black;
    border: none;
}

.list-group-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.me-2 {
    margin-right: 0.5rem;
}

/* Thêm vào style hiện có */
.close-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    border: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 5px;
    display: none;
}

@media (max-width: 767px) {
    .close-btn {
        display: block;
    }
}
</style>
