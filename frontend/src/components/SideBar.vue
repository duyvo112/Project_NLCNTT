<template>
    <div class="sidebar p-3 z-3">
        <h2 class="text-center logo p-4">
            <router-link :to="{ name: 'HomePage' }" class="text-decoration-none text-dark">
                FriendGram
            </router-link>
        </h2>
        <ul class="nav flex-column fs-5">
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'HomePage' }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'house']" />
                    <span>Home</span>
                </router-link>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'ExplorePage' }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'compass']" />
                    <span>Explore</span>
                </router-link>
            </li>
            <li class="nav-item m-1">
                <a class="nav-link" href="#" @click="openSearchModal">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'search']" />
                    <span>Search</span>
                </a>
            </li>
            <li class="nav-item m-1">
                <router-link class="nav-link" :to="{ name: 'ChatPage' }">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'message']" />
                    <span>Messages</span>
                </router-link>
            </li>
            <li class="nav-item m-1">
                <a :class="notificationCount > 0 ? 'nav-link text-danger' : 'nav-link'" href="#"
                    @click="openNotification">
                    <font-awesome-icon class="nav-icon" :icon="['fas', 'bell']" />
                    <span>Notifications ({{ notificationCount }})</span>
                </a>
            </li>
            <router-link v-if="userId" class="nav-link" :to="{ name: 'UserProfile', params: { id: userId } }">
                <font-awesome-icon class="nav-icon" :icon="['fas', 'user']" />
                <span>Profile</span>
            </router-link>

        </ul>

        <!-- Notification Modal -->
        <NotificationComponent :isOpen="isNotificationOpen" @close="isNotificationOpen = false" :userId="userId"
            @countNotification="updateNotificationCount" />
        <SearchModal :isOpen="isSearchOpen" @close="isSearchOpen = false" />
    </div>
</template>

<script>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import NotificationComponent from "@/components/Notification.vue";
import SearchModal from "@/components/SearchModal.vue";

export default {
    name: "SideBar",
    components: { NotificationComponent, SearchModal },
    setup() {
        const userStore = useUserStore();
        const userId = computed(() => userStore.user?._id);
        const isNotificationOpen = ref(false);
        const isSearchOpen = ref(false);

        const openNotification = () => {
            isNotificationOpen.value = true;
        };

        const openSearchModal = () => {
            isSearchOpen.value = true;
        };

        return { userId, isNotificationOpen, openNotification, isSearchOpen, openSearchModal };
    },
    data() {
        return {
            notificationCount: 0
        }
    },
    methods: {
        updateNotificationCount(count) {
            this.notificationCount = count;
        }
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
    width: 100%;
}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.nav-icon {
    font-size: 20px;
    width: 25px;
    text-align: center;
}
</style>
