<template>
    <div class="container-fluid p-0">
        <div class="row">
            <!-- Cột trái -->
            <div class="col-md-2 d-none d-md-block border-end p-0 ">
                <Sidebar class="sidebar-container" />
            </div>

            <!-- Cột giữa -->
            <div class="col-md-7">
                <Feed />
            </div>

            <!-- Cột phải -->
            <div class="col-md-3 d-none d-md-block border-start p-0">
                <Suggestions />
            </div>
        </div>

        <!-- Icon trở lên đầu trang -->
        <button class="scroll-to-top" @click="scrollToTop">
            <font-awesome-icon :icon="['fas', 'arrow-up']" />
        </button>
    </div>
</template>

<script>
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
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};
</script>

<style scoped>
.sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: auto;
}

.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.scroll-to-top:hover {
    background-color: #0056b3;
}
</style>