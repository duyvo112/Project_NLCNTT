<template>
    <div class="sidebar p-3">
        <h2 class="text-center logo"><router-link :to="{ name: 'HomePage' }"
                class="text-decoration-none text-dark">FriendGram</router-link></h2>
        <ul class="nav flex-column fs-5">
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'HomePage' }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'house']" />
                    <span>Home</span>
                </router-link>
            </li>
            <!-- <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'Search' }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'magnifying-glass']" />
                    <span>Search</span>
                </router-link>
            </li> -->
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'UserProfile', params: { id: userId } }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'user']" />
                    <span>Profile</span>
                </router-link>
            </li>
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
        const userId = computed(() => userStore.user?._id);

        return { userId, userStore };
    }
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
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 10px;
    gap: 10px;
    /* Khoảng cách giữa icon và chữ */
    width: 100%;
}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.nav-icon {
    font-size: 20px;
    width: 25px;
    /* Đảm bảo tất cả icon có cùng độ rộng */
    text-align: center;
}
</style>
