<template>
    <div class="sidebar p-3">
        <h2 class="text-center logo">FriendGram</h2>
        <ul class="nav flex-column fs-5">
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'HomePage' }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'house']" />Home
                </router-link>
            </li>
            <!-- <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'Search' }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'magnifying-glass']" />Search
                </router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'Explore' }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'compass']" />Explore
                </router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'Messages' }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'message']" />Messages
                </router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'Notifications' }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'bell']" />Notifications
                </router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'UserProfile', params: { id: userId } }">
                    <font-awesome-icon class="me-2" :icon="['fas', 'user']" />Profile
                </router-link>
            </li> -->
        </ul>
    </div>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

export default {
    name: "SideBar",
    setup() {
        const userStore = useUserStore();
        const userId = computed(() => userStore.user?._id); // Lấy ID người dùng từ store

        return { userId };
    },
};
</script>

<style scoped>
.sidebar {
    color: black;
}

.logo {
    font-family: "Brush Script MT", cursive;
    font-size: 39px;
}

.nav-link {
    color: black;
    text-decoration: none;
}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>
