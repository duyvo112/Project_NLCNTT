<template>
    <div class="container-fluid px-0">
        <!-- Thanh điều hướng mobile -->
        <div class="mobile-nav d-md-none fixed-top bg-white py-2 px-3 d-flex justify-content-between">
            <button class="btn" @click="toggleSidebar">
                <font-awesome-icon :icon="['fas', 'bars']" />
            </button>
            <h4 class="mb-0 logo">FriendGram</h4>
            <button class="btn" @click="toggleSuggestions">
                <font-awesome-icon :icon="['fas', 'users']" />
            </button>
        </div>

        <div class="row pt-2">
            <!-- Sidebar -->
            <div :class="[
                'col-md-2 p-0',
                { 'd-none d-md-block': !showSidebar },
                { 'mobile-sidebar': !isDesktop && showSidebar }
            ]">
                <Sidebar @close="showSidebar = false" />
            </div>

            <!-- Feed -->
            <div class="col-md-7 d-flex justify-content-center">
                <!-- Thêm margin-top cho mobile -->
                <div :class="['w-100', { 'mt-5': !isDesktop }]">
                    <Feed />
                </div>
            </div>

            <!-- Suggestions -->
            <div :class="[
                'col-md-3 p-0',
                { 'd-none d-md-block': !showSuggestions },
                { 'mobile-suggestions': !isDesktop && showSuggestions }
            ]">
                <Suggestions @close="showSuggestions = false" />
            </div>
        </div>

        <!-- Overlay cho mobile -->
        <div v-if="!isDesktop && (showSidebar || showSuggestions)" class="overlay" @click="closeAll">
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Sidebar from "../components/SideBar.vue";
import Feed from "../components/Feed.vue";
import Suggestions from "../components/Suggestions.vue";

export default {
    name: 'HomePage',
    components: {
        Sidebar,
        Feed,
        Suggestions,
    },
    setup() {
        const showSidebar = ref(false);
        const showSuggestions = ref(false);
        const isDesktop = ref(window.innerWidth >= 768);

        const toggleSidebar = () => {
            showSidebar.value = !showSidebar.value;
            if (showSidebar.value) showSuggestions.value = false;
        };

        const toggleSuggestions = () => {
            showSuggestions.value = !showSuggestions.value;
            if (showSuggestions.value) showSidebar.value = false;
        };

        const closeAll = () => {
            showSidebar.value = false;
            showSuggestions.value = false;
        };

        const handleResize = () => {
            isDesktop.value = window.innerWidth >= 768;
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            showSidebar,
            showSuggestions,
            isDesktop,
            toggleSidebar,
            toggleSuggestions,
            closeAll
        };
    }
};
</script>

<style scoped>
.logo {
    font-family: "Brush Script MT", cursive;
}

.mobile-nav {
    z-index: 1030;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.mobile-sidebar,
.mobile-suggestions {
    position: fixed;
    top: 0;
    bottom: 0;
    background: white;
    z-index: 1040;
    width: 80%;
    max-width: 300px;
    overflow-y: auto;
}

.mobile-sidebar {
    left: 0;
}

.mobile-suggestions {
    right: 0;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1035;
}

@media (max-width: 767px) {
    .container-fluid {
        padding-top: 56px;
    }
}
</style>